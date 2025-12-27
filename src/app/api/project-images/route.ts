import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif']);

function isSafeProjectId(projectId: string) {
    return /^[a-z0-9-]+$/i.test(projectId);
}

function isLogoFile(fileName: string) {
    const base = fileName.toLowerCase();
    return base === 'logo' || base.startsWith('logo.');
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const projectId = (searchParams.get('projectId') ?? '').trim();

    if (!projectId || !isSafeProjectId(projectId)) {
        return NextResponse.json({ images: [] }, { status: 200 });
    }

    const folderPath = path.join(process.cwd(), 'public', 'img', 'projects', projectId);

    try {
        const dirents = await fs.readdir(folderPath, { withFileTypes: true });

        const files = dirents
            .filter((d) => d.isFile())
            .map((d) => d.name)
            .filter((name) => !isLogoFile(name))
            .filter((name) => ALLOWED_EXTENSIONS.has(path.extname(name).toLowerCase()));

        files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

        const images = files.map((name) => `/img/projects/${projectId}/${encodeURIComponent(name)}`);

        return NextResponse.json({ images }, { status: 200 });
    } catch {
        return NextResponse.json({ images: [] }, { status: 200 });
    }
}
