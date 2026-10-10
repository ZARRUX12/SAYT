const fs = require('fs');
const content = fs.readFileSync('components/3d/earthMapData.ts', 'utf8');
const b64 = content.split('"')[1];
const buf = Buffer.from(b64, 'base64');
console.log('Buffer length:', buf.length);

let totalOnes = 0;
for (let i = 0; i < buf.length; i++) {
  const b = buf[i];
  for (let k = 0; k < 8; k++) {
    if ((b & (1 << k)) !== 0) totalOnes++;
  }
}
console.log('Total land bits:', totalOnes, 'out of', 360 * 180);
