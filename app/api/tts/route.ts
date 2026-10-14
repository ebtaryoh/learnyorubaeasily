import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const PRONUNCIATIONS_DIR = path.join(process.cwd(), 'public', 'audio', 'pronunciations')
const MANIFEST_PATH = path.join(process.cwd(), 'public', 'audio', 'manifest.json')
const STUDIO_META_PATH = path.join(process.cwd(), 'public', 'audio', 'studio_meta.json')

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const text = searchParams.get('text')

  if (!text || !text.trim()) {
    return new NextResponse('Missing text query parameter', { status: 400 })
  }

  const cleanText = text.trim()
  const STUDIO_META_PATH = path.join(process.cwd(), 'public', 'audio', 'studio_meta.json')
  let humanFilename: string | null = null

  // 1. Check studio_meta.json for verified human recordings
  if (fs.existsSync(STUDIO_META_PATH)) {
    try {
      const studioMeta = JSON.parse(fs.readFileSync(STUDIO_META_PATH, 'utf-8'))
      const meta = studioMeta[cleanText] || studioMeta[cleanText.toLowerCase()]
      if (meta && meta.filename && meta.isHuman) {
        humanFilename = meta.filename
      }
    } catch {
      // ignore
    }
  }

  // 2. Check manifest.json for files prefixed with human_
  if (!humanFilename && fs.existsSync(MANIFEST_PATH)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'))
      const mapped = manifest[cleanText] || manifest[cleanText.toLowerCase()]
      if (mapped && (mapped.startsWith('human_') || mapped.includes('studio'))) {
        humanFilename = mapped
      }
    } catch {
      // ignore
    }
  }

  // 3. If a real human recording exists on disk, serve it with high fidelity
  if (humanFilename) {
    const humanFilePath = path.join(PRONUNCIATIONS_DIR, humanFilename)
    if (fs.existsSync(humanFilePath)) {
      try {
        const audioBuffer = fs.readFileSync(humanFilePath)
        if (audioBuffer.length > 100) {
          const ext = path.extname(humanFilePath).toLowerCase()
          const contentType =
            ext === '.webm' ? 'audio/webm' :
            ext === '.wav' ? 'audio/wav' :
            ext === '.mp4' || ext === '.m4a' ? 'audio/mp4' :
            ext === '.ogg' ? 'audio/ogg' : 'audio/mpeg'

          return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
              'Content-Type': contentType,
              'Content-Length': audioBuffer.length.toString(),
              'Cache-Control': 'no-cache, must-revalidate',
              'X-Audio-Source': 'human_tutor_recording',
            },
          })
        }
      } catch (e) {
        console.warn(`Error reading human audio file for "${cleanText}":`, e)
      }
    }
  }

  // 4. MUTE / SILENCE: No human recording yet.
  // Return 204 No Content so no robotic synthetic audio is heard by visitors.
  return new NextResponse(null, {
    status: 204,
    headers: {
      'X-Audio-Status': 'pending_tutor_studio_recording',
      'Cache-Control': 'no-store',
    },
  })
}
