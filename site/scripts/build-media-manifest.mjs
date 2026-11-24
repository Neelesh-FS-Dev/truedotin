// Writes src/content/media.generated.json with the real pixel size of each exported photo,
// so layouts reserve the correct box before the image loads (prevents layout shift).
import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const photoDir = join(root, "public/media/photos");
const sizes = {};

for (const file of readdirSync(photoDir).filter((f) => f.endsWith("-1280.avif")).sort()) {
  const id = file.replace("-1280.avif", "");
  const out = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", join(photoDir, file)], {
    encoding: "utf8",
  });
  const width = Number(/pixelWidth: (\d+)/.exec(out)?.[1]);
  const height = Number(/pixelHeight: (\d+)/.exec(out)?.[1]);
  sizes[id] = { width, height };
}

writeFileSync(
  join(root, "src/content/media.generated.json"),
  JSON.stringify(sizes, null, 2) + "\n",
);
console.log(`manifest: ${Object.keys(sizes).length} photos`);
