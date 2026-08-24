const fs = require('fs');

let code = fs.readFileSync('src/engine/saveParser/utils/detection.ts', 'utf-8');
code = code.replace(
`export function isGen3Save(view: DataView): boolean {
  try {
    if (view.byteLength > 0x0ff8) {`,
`export function isGen3Save(view: DataView): boolean {
  try {
    if (view.byteLength > 0) {
      view.getUint8(0);
    }

    if (view.byteLength > 0x0ff8) {`
);
fs.writeFileSync('src/engine/saveParser/utils/detection.ts', code);
