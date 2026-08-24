const fs = require('fs');
let code = fs.readFileSync('src/engine/saveParser/utils/detection.ts', 'utf-8');
code = code.replace(
`export function isGen3Save(view: DataView): boolean {
  try {
    if (view.byteLength > 0) {
      view.getUint8(0);
    }
    return false; // Stub implementation`,
`export function isGen3Save(view: DataView): boolean {
  try {
    if (view.byteLength > 0x0ff8) {
      const signature = view.getUint32(0x0ff8, true);
      if (signature === 0x08012025) {
         return true;
      }
    }

    if (view.byteLength > 0xe000 + 0x0ff8) {
      const signatureB = view.getUint32(0xe000 + 0x0ff8, true);
      if (signatureB === 0x08012025) {
         return true;
      }
    }
    return false;`
);
fs.writeFileSync('src/engine/saveParser/utils/detection.ts', code);
