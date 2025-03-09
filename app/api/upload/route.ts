/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  if (!file.type.startsWith('video/')) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${uuidv4()}${path.extname(file.name)}`
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
    
    fs.writeFileSync(path.join(uploadDir, filename), buffer)
    
    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      filename
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload video' },
      { status: 500 }
    )
  }
}