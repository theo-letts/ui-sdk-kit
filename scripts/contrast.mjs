// Contrast gate for kit/ui-sdk-kit.css. Reads every `--name: light-dark(#a, #b)`
// token and checks the pairs below in both modes. Text needs 4.5:1; a control's
// stroke or a focus ring needs 3:1 (WCAG 1.4.3 and 1.4.11).
import { readFileSync } from "node:fs";

const css = readFileSync(
  new URL("../kit/ui-sdk-kit.css", import.meta.url),
  "utf8",
);
const tokens = {};
for (const [, name, light, dark] of css.matchAll(
  /(--[\w-]+):\s*light-dark\(\s*(#[0-9a-f]{6})\s*,\s*(#[0-9a-f]{6})\s*\)/gi,
)) {
  tokens[name] = { light, dark };
}

const TEXT = 4.5;
const STROKE = 3;
const pairs = [
  ["--ui-foreground", "--ui-background", TEXT],
  ["--ui-foreground", "--kit-canvas", TEXT],
  ["--ui-foreground", "--ui-muted", TEXT],
  ["--ui-foreground", "--kit-selection", TEXT],
  ["--ui-muted-foreground", "--ui-background", TEXT],
  ["--ui-muted-foreground", "--kit-canvas", TEXT],
  ["--ui-muted-foreground", "--ui-muted", TEXT],
  ["--kit-subtle", "--ui-background", TEXT],
  ["--kit-subtle", "--kit-canvas", TEXT],
  ["--ui-primary-foreground", "--ui-primary", TEXT],
  ["--kit-accent-foreground", "--kit-accent-solid", TEXT],
  ["--kit-accent-foreground", "--kit-accent-solid-hover", TEXT],
  ["--kit-accent", "--ui-background", TEXT],
  ["--ui-destructive", "--ui-background", TEXT],
  ["--ui-input", "--ui-background", STROKE],
  ["--ui-input", "--kit-canvas", STROKE],
  ["--ui-ring", "--ui-background", STROKE],
  ["--ui-ring", "--kit-canvas", STROKE],
];

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

let failed = 0;
for (const [fg, bg, min] of pairs) {
  for (const mode of ["light", "dark"]) {
    if (!tokens[fg] || !tokens[bg]) {
      console.error(`missing token: ${tokens[fg] ? bg : fg}`);
      failed++;
      continue;
    }
    const r = ratio(tokens[fg][mode], tokens[bg][mode]);
    const ok = r >= min;
    if (!ok) failed++;
    console.log(
      `${ok ? "ok  " : "FAIL"} ${mode.padEnd(5)} ${r.toFixed(2).padStart(5)}:1 (min ${min})  ${fg} on ${bg}`,
    );
  }
}

if (failed) {
  console.error(`\n${failed} pair(s) below their floor.`);
  process.exit(1);
}
console.log(`\nall ${pairs.length * 2} pairs pass.`);
