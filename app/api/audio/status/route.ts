import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const STUDIO_META_PATH = path.join(process.cwd(), 'public', 'audio', 'studio_meta.json')
const MANIFEST_PATH = path.join(process.cwd(), 'public', 'audio', 'manifest.json')
const PRONUNCIATIONS_DIR = path.join(process.cwd(), 'public', 'audio', 'pronunciations')

export async function GET() {
  try {
    let studioMeta: Record<string, any> = {}
    if (fs.existsSync(STUDIO_META_PATH)) {
      try {
        studioMeta = JSON.parse(fs.readFileSync(STUDIO_META_PATH, 'utf-8'))
      } catch {
        studioMeta = {}
      }
    }

    let manifest: Record<string, string> = {}
    if (fs.existsSync(MANIFEST_PATH)) {
      try {
        manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'))
      } catch {
        manifest = {}
      }
    }

    // Verify if files actually exist on disk
    const verifiedHumanRecords: Record<string, any> = {}
    for (const [key, meta] of Object.entries(studioMeta)) {
      if (meta && meta.filename) {
        const fullPath = path.join(PRONUNCIATIONS_DIR, meta.filename)
        if (fs.existsSync(fullPath)) {
          verifiedHumanRecords[key] = {
            ...meta,
            exists: true,
            url: `/audio/pronunciations/${meta.filename}`
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      humanRecordings: verifiedHumanRecords,
      totalHumanRecorded: Object.keys(verifiedHumanRecords).length,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
