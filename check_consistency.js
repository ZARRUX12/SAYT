const fs = require('fs');
const content = fs.readFileSync('components/3d/earthMapData.ts', 'utf8');
const b64 = content.split('"')[1];
const buf = Buffer.from(b64, 'base64');

function isRealEarthLand(lat, lon) {
  const clampedLat = Math.max(-89.9, Math.min(89.9, lat));
  const y = Math.floor((90 - clampedLat) * (180 / 180));
  let normLon = ((lon + 180) % 360 + 360) % 360;
  const x = Math.floor(normLon * (360 / 360));
  const bitIndex = y * 360 + x;
  const byteIndex = Math.floor(bitIndex / 8);
  const bitOffset = bitIndex % 8;
  if (byteIndex < 0 || byteIndex >= buf.length) return false;
  return (buf[byteIndex] & (1 << bitOffset)) !== 0;
}

// Test current code vs consistent code:
const count = 16000;
let curCount = 0;
let newCount = 0;

for (let i = 0; i < count; i++) {
  const yVal = 1 - (i / (count - 1)) * 2;
  const phi = Math.acos(yVal);
  const lat = 90 - (phi * 180) / Math.PI;

  // CURRENT DigitalGlobe.tsx:
  const theta = i * 2.399963229728653;
  const rawLon = ((theta * 180) / Math.PI) % 360;
  const curLon = rawLon > 180 ? rawLon - 360 : rawLon < -180 ? rawLon + 360 : rawLon;
  if (isRealEarthLand(lat, curLon)) curCount++;

  // CONSISTENT with toCartesian:
  // theta = (lon + 180) * PI / 180  => lon = theta * 180 / PI - 180
  const deg = (theta * 180) / Math.PI;
  const trueLon = ((deg % 360) + 360) % 360 - 180;
  if (isRealEarthLand(lat, trueLon)) newCount++;
}

console.log('Current count:', curCount, 'Consistent count:', newCount);
