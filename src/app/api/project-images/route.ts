import { NextResponse } from 'next/server';

export const runtime = 'edge';

// Cloudflare Pages requires Edge runtime for all dynamic routes.
// The app now uses a build-time generated static manifest at `/img/projects/manifest.json`.
// This route is kept as a no-op for backward compatibility.
export async function GET() {
    return NextResponse.json({ images: [] }, { status: 200 });
}
