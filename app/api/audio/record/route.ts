import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const PRONUNCIATIONS_DIR = path.join(process.cwd(), 'public', 'audio', 'pronunciations')
const MANIFEST_PATH = path.join(process.cwd(), 'public', 'audio', 'manifest.json')
const STUDIO_META_PATH = path.join(process.cwd(), 'public', 'audio', 'studio_meta.json')

function getCleanSlug(text: string): string {
  const clean = text.trim().toLowerCase()
  const md5 = crypto.createHash('md5').update(clean).digest('hex').slice(0, 8)
  const slug = clean
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 20)
  return `${slug || 'phrase'}_${md5}`
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as Blob | null
    const text = (formData.get('text') as string | null)?.trim()
    const itemId = formData.get('id') as string | null
    const category = formData.get('category') as string | null

    if (!file || !text) {
      return NextResponse.json({ error: 'Missing file or text in request' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    if (buffer.length < 100) {
      return NextResponse.json({ error: 'Audio file too small or empty' }, { status: 400 })
    }

    // Determine extension based on mime type or default
    const mimeType = file.type || 'audio/webm'
    let ext = '.webm'
    if (mimeType.includes('mp4') || mimeType.includes('m4a')) ext = '.mp4'
    else if (mimeType.includes('wav')) ext = '.wav'
    else if (mimeType.includes('mpeg') || mimeType.includes('mp3')) ext = '.mp3'
    else if (mimeType.includes('ogg')) ext = '.ogg'

    if (!fs.existsSync(PRONUNCIATIONS_DIR)) {
      fs.mkdirSync(PRONUNCIATIONS_DIR, { recursive: true })
    }

    // Generate distinctive human recording filename
    const slug = getCleanSlug(text)
    const filename = `human_${slug}${ext}`
    const filePath = path.join(PRONUNCIATIONS_DIR, filename)

    // Write file to disk
    fs.writeFileSync(filePath, buffer)

    // Update manifest.json
    let manifest: Record<string, string> = {}
    if (fs.existsSync(MANIFEST_PATH)) {
      try {
        manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'))
      } catch {
        manifest = {}
      }
    }

    manifest[text] = filename
    manifest[text.toLowerCase()] = filename
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))

    // Update studio_meta.json
    let studioMeta: Record<string, any> = {}
    if (fs.existsSync(STUDIO_META_PATH)) {
      try {
        studioMeta = JSON.parse(fs.readFileSync(STUDIO_META_PATH, 'utf-8'))
      } catch {
        studioMeta = {}
      }
    }

    studioMeta[text] = {
      id: itemId,
      text,
      category,
      filename,
      sizeBytes: buffer.length,
      mimeType,
      recordedAt: new Date().toISOString(),
      isHuman: true
    }
    fs.writeFileSync(STUDIO_META_PATH, JSON.stringify(studioMeta, null, 2))

    return NextResponse.json({
      success: true,
      filename,
      url: `/audio/pronunciations/${filename}`,
      sizeBytes: buffer.length,
      text,
      recordedAt: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Failed to save audio recording:', error)
    return NextResponse.json({ error: error.message || 'Failed to save recording' }, { status: 500 })
  }
}
