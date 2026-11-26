// NusaStat entry program (Node 22, standard library only).
// The site is this directory's app/ folder: plain static files a browser
// opens at app/index.html (ES modules, CSS, no build step, no network
// request). This program hands it in: it copies app/ and screenshots/
// from beside this file to /output and writes /output/dossier.json with
// the vendored make.fun library. Leave vendor/makefun-frontend.ts as it
// is: the scorer requires dossier.json to be byte for byte what its own
// copy writes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Fail early with a clear message instead of letting buildDossier
// report a missing input after the copy: the site and its cover shot
// must both exist before anything is handed in.
const indexPath = join(here, "app", "index.html");
if (!existsSync(indexPath)) {
  throw new Error("main.ts: app/index.html is missing, nothing to hand in");
}
const shotDir = join(here, "screenshots");
const shots = existsSync(shotDir)
  ? readdirSync(shotDir).filter((name) => !name.startsWith("."))
  : [];
if (shots.length < 3 || shots.length > 4) {
  throw new Error("main.ts: screenshots/ must hold 3 or 4 images, found " + shots.length);
}
for (const name of shots) {
  const size = statSync(join(shotDir, name)).size;
  if (size > 262144) {
    throw new Error("main.ts: screenshot " + name + " is " + size + " bytes, over the 256 KiB cap");
  }
}

mkdirSync(out, { recursive: true });
cpSync(join(here, "app"), join(out, "app"), { recursive: true });
mkdirSync(join(out, "screenshots"), { recursive: true });
cpSync(shotDir, join(out, "screenshots"), { recursive: true });

// The scorer's own caps: only text_max_bytes shapes the bytes; the rest
// refuse an entry the scorer would refuse (more than 4 screenshots or
// one over 256 KiB; more than 993 files and directories in app/ or
// 16 MiB of app files).
const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216
});
writeFileSync(join(out, "dossier.json"), dossier);
console.log("NusaStat handed in: " + shots.length + " screenshots, dossier " + dossier.length + " bytes, to " + out);
