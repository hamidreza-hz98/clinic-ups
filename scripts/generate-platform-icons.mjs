import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = await readFile(path.join(root, "public/images/logo/logo-mark.svg"));
const faviconDirectory = path.join(root, "public/images/favicon");

async function renderPng(target, size) {
  const png = await sharp(source)
    .resize(size, size, { fit: "contain", background: "#ffffff" })
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer();
  await writeFile(target, png);
  return png;
}

const sizes = {
  "android-icon-36x36.png": 36,
  "android-icon-48x48.png": 48,
  "android-icon-72x72.png": 72,
  "android-icon-96x96.png": 96,
  "android-icon-144x144.png": 144,
  "android-icon-192x192.png": 192,
  "apple-icon.png": 180,
  "apple-icon-precomposed.png": 180,
  "apple-icon-57x57.png": 57,
  "apple-icon-60x60.png": 60,
  "apple-icon-72x72.png": 72,
  "apple-icon-76x76.png": 76,
  "apple-icon-114x114.png": 114,
  "apple-icon-120x120.png": 120,
  "apple-icon-144x144.png": 144,
  "apple-icon-152x152.png": 152,
  "apple-icon-180x180.png": 180,
  "favicon-16x16.png": 16,
  "favicon-32x32.png": 32,
  "favicon-96x96.png": 96,
  "ms-icon-70x70.png": 70,
  "ms-icon-144x144.png": 144,
  "ms-icon-150x150.png": 150,
  "ms-icon-310x310.png": 310,
};

for (const [file, size] of Object.entries(sizes)) {
  await renderPng(path.join(faviconDirectory, file), size);
}

await renderPng(path.join(root, "app/apple-icon.png"), 180);
const faviconPng = await renderPng(path.join(faviconDirectory, "favicon-32x32.png"), 32);

const iconHeader = Buffer.alloc(22);
iconHeader.writeUInt16LE(0, 0);
iconHeader.writeUInt16LE(1, 2);
iconHeader.writeUInt16LE(1, 4);
iconHeader.writeUInt8(32, 6);
iconHeader.writeUInt8(32, 7);
iconHeader.writeUInt8(0, 8);
iconHeader.writeUInt8(0, 9);
iconHeader.writeUInt16LE(1, 10);
iconHeader.writeUInt16LE(32, 12);
iconHeader.writeUInt32LE(faviconPng.length, 14);
iconHeader.writeUInt32LE(22, 18);
const ico = Buffer.concat([iconHeader, faviconPng]);

await Promise.all([
  writeFile(path.join(root, "app/favicon.ico"), ico),
  writeFile(path.join(faviconDirectory, "favicon.ico"), ico),
]);

console.log(`Generated ${Object.keys(sizes).length + 3} platform icon files from logo-mark.svg`);
