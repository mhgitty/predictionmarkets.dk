import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const type = body?._type

    // Revalidate relevant paths based on document type
    if (type === 'post') {
      revalidatePath('/blog')
      revalidatePath('/[slug]', 'page')
      revalidatePath('/')
    } else if (type === 'page') {
      revalidatePath('/[slug]', 'page')
    } else if (type === 'platform') {
      revalidatePath('/platforme')
      revalidatePath('/platforme/[slug]', 'page')
    } else if (type === 'category') {
      revalidatePath('/blog')
      revalidatePath('/')
    } else if (type === 'homePage') {
      revalidatePath('/')
    } else {
      // Fallback: revalidate everything
      revalidatePath('/', 'layout')
    }

    return NextResponse.json({ revalidated: true, type })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
