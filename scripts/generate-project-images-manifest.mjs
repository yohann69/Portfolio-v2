import fs from 'node:fs/promises';
import path from 'node:path';

const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif']);

function isLogoFile(fileName) {
  const lower = fileName.toLowerCase();
  return lower === 'logo' || lower.startsWith('logo.');
}

function sortNaturally(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

async function main() {
  const root = process.cwd();
  const projectsDir = path.join(root, 'public', 'img', 'projects');
  const outFile = path.join(projectsDir, 'manifest.json');

  let dirents;
  try {
    dirents = await fs.readdir(projectsDir, { withFileTypes: true });
  } catch (err) {
    console.error('[manifest] Failed to read projects directory:', projectsDir);
    throw err;
  }

  const projectFolders = dirents
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort(sortNaturally);

  const projects = {};

  for (const projectId of projectFolders) {
    const folderPath = path.join(projectsDir, projectId);
    const entries = await fs.readdir(folderPath, { withFileTypes: true });

    const files = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => !isLogoFile(name))
      .filter((name) => ALLOWED_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .sort(sortNaturally);

    projects[projectId] = files.map((name) => `/img/projects/${projectId}/${encodeURIComponent(name)}`);
  }

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    projects,
  };

  await fs.mkdir(projectsDir, { recursive: true });
  await fs.writeFile(outFile, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  console.log(`[manifest] Wrote ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
