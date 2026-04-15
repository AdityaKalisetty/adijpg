const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const categories = ['people', 'nature', 'abstract', 'solo', 'group', 'events'];
const sourceRoot = path.join(__dirname, '..', 'src', 'assets', 'images');
const outputRoot = path.join(__dirname, '..', 'src', 'assets', 'portfolio-web');
const validExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function ensureCleanDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

function sanitizeName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function optimizeCategory(category) {
  const sourceDir = path.join(sourceRoot, category);
  const outputDir = path.join(outputRoot, category);
  await fs.mkdir(outputDir, { recursive: true });

  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  let index = 0;

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (!validExtensions.has(ext)) continue;

    const sourceFile = path.join(sourceDir, entry.name);
    const base = sanitizeName(path.parse(entry.name).name) || `image-${index + 1}`;
    const outputFile = path.join(outputDir, `${String(index + 1).padStart(2, '0')}-${base}.jpg`);

    await sharp(sourceFile)
      .rotate()
      .resize({
        width: 1400,
        height: 1400,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 78,
        mozjpeg: true,
      })
      .toFile(outputFile);

    index += 1;
  }
}

async function main() {
  await ensureCleanDir(outputRoot);
  for (const category of categories) {
    await optimizeCategory(category);
  }
  console.log('Optimized portfolio images written to src/assets/portfolio-web');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
