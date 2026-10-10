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

const R = 2.0;
function toCartesian(lat, lon) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -R * Math.sin(phi) * Math.cos(theta),
    y: R * Math.cos(phi),
    z: R * Math.sin(phi) * Math.sin(theta)
  };
}

// Tashkent: lat 41.31, lon 69.24
const tCity = toCartesian(41.31, 69.24);

// Find closest Fibonacci point:
const count = 45000;
let closestDist = 999;
let closestPoint = null;
let closestLatLon = null;

for (let i = 0; i < count; i++) {
  const yVal = 1 - (i / (count - 1)) * 2;
  const phi = Math.acos(yVal);
  const lat = 90 - (phi * 180) / Math.PI;

  const theta = i * 2.399963229728653;
  const deg = (theta * 180) / Math.PI;
  const lon = ((deg % 360) + 360) % 360 - 180;

  if (isRealEarthLand(lat, lon)) {
    const x = -R * Math.sin(phi) * Math.cos(theta);
    const y = R * Math.cos(phi);
    const z = R * Math.sin(phi) * Math.sin(theta);
    const d = Math.sqrt((x - tCity.x)**2 + (y - tCity.y)**2 + (z - tCity.z)**2);
    if (d < closestDist) {
      closestDist = d;
      closestPoint = { x, y, z };
      closestLatLon = { lat, lon };
    }
  }
}

console.log('Distance between Tashkent city and closest land dot:', closestDist);
console.log('Tashkent:', tCity, 'Closest land dot:', closestPoint, 'LatLon:', closestLatLon);
