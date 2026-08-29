import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-static'

// The page is a static file. Reading it synchronously on every request blocked
// the event loop for no reason; it is read once per server instance now.
let cached: string | undefined

function readPage() {
  if (!cached) {
    cached = fs.readFileSync(
      path.join(process.cwd(), 'public/cellar/index.html'),
      'utf-8'
    )
  }
  return cached
}

export async function GET() {
  return new NextResponse(readPage(), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
