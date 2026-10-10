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

// Let's test Fibonacci sampling:
const count = 30000;
let matched = 0;
for (let i = 0; i < count; i++) {
  const yVal = 1 - (i / (count - 1)) * 2;
  const phi = Math.acos(yVal);
  const lat = 90 - (phi * 180) / Math.PI;

  // With golden angle:
  const angle = i * 2.399963229728653;
  // lon in degrees:
  // If theta in city is (lon + 180) * PI / 180
  // then angle = (lon + 180) * PI / 180  => lon = (angle * 180 / PI) - 180
  const deg = (angle * 180 / Math.PI);
  let lon = ((deg % 360) + 360) % 360 - 180;

  if (isRealEarthLand(lat, lon)) {
    matched++;
  }
}
console.log('Sampled land points with 30k count:', matched);
