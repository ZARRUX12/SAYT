const fs = require('fs');

const clientCities = [
  // Central Asia / Headquarters & Regional Hubs
  { name: "Samarkand", lat: 39.65, lon: 66.96 },
  { name: "Tashkent", lat: 41.31, lon: 69.24 },
  { name: "Bukhara", lat: 39.77, lon: 64.42 },
  { name: "Andijan", lat: 40.78, lon: 72.34 },
  { name: "Almaty", lat: 43.24, lon: 76.91 },
  { name: "Astana", lat: 51.17, lon: 71.43 },
  { name: "Bishkek", lat: 42.87, lon: 74.59 },
  { name: "Dushanbe", lat: 38.56, lon: 68.78 },
  { name: "Baku", lat: 40.41, lon: 49.87 },
  { name: "Tbilisi", lat: 41.72, lon: 44.78 },

  // Middle East & West Asia
  { name: "Dubai", lat: 25.20, lon: 55.27 },
  { name: "Abu Dhabi", lat: 24.45, lon: 54.38 },
  { name: "Riyadh", lat: 24.71, lon: 46.68 },
  { name: "Doha", lat: 25.29, lon: 51.53 },
  { name: "Istanbul", lat: 41.01, lon: 28.98 },

  // East & South Asia
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "Seoul", lat: 37.57, lon: 126.98 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Kuala Lumpur", lat: 3.14, lon: 101.69 },
  { name: "Bangkok", lat: 13.76, lon: 100.50 },
  { name: "Shanghai", lat: 31.23, lon: 121.47 },
  { name: "Hong Kong", lat: 22.32, lon: 114.17 },
  { name: "Mumbai", lat: 19.08, lon: 72.88 },

  // Europe
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Paris", lat: 48.86, lon: 2.35 },
  { name: "Berlin", lat: 52.52, lon: 13.41 },
  { name: "Frankfurt", lat: 50.11, lon: 8.68 },
  { name: "Amsterdam", lat: 52.37, lon: 4.89 },
  { name: "Zurich", lat: 47.38, lon: 8.54 },
  { name: "Vienna", lat: 48.21, lon: 16.37 },
  { name: "Milan", lat: 45.46, lon: 9.19 },
  { name: "Madrid", lat: 40.42, lon: -3.70 },
  { name: "Stockholm", lat: 59.33, lon: 18.07 },
  { name: "Oslo", lat: 59.91, lon: 10.75 },
  { name: "Warsaw", lat: 52.23, lon: 21.01 },

  // North America
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "San Francisco", lat: 37.77, lon: -122.42 },
  { name: "Los Angeles", lat: 34.05, lon: -118.24 },
  { name: "Chicago", lat: 41.88, lon: -87.63 },
  { name: "Miami", lat: 25.76, lon: -80.19 },
  { name: "Toronto", lat: 43.65, lon: -79.38 },
  { name: "Vancouver", lat: 49.28, lon: -123.12 },

  // South America
  { name: "Sao Paulo", lat: -23.55, lon: -46.63 },
  { name: "Buenos Aires", lat: -34.60, lon: -58.38 },
  { name: "Santiago", lat: -33.45, lon: -70.67 },
  { name: "Bogota", lat: 4.71, lon: -74.07 },

  // Africa
  { name: "Cairo", lat: 30.04, lon: 31.24 },
  { name: "Johannesburg", lat: -26.20, lon: 28.05 },
  { name: "Cape Town", lat: -33.92, lon: 18.42 },
  { name: "Casablanca", lat: 33.57, lon: -7.59 },
  { name: "Nairobi", lat: -1.29, lon: 36.82 },

  // Oceania
  { name: "Sydney", lat: -33.87, lon: 151.21 },
  { name: "Melbourne", lat: -37.81, lon: 144.96 },
];

const cityMap = new Map();
clientCities.forEach(c => cityMap.set(c.name, c));

const arcPairs = [
  // Intercontinental major cyber flight routes:
  ["Tashkent", "Frankfurt"],
  ["Tashkent", "Dubai"],
  ["Tashkent", "London"],
  ["Tashkent", "Tokyo"],
  ["Tashkent", "Almaty"],
  ["Samarkand", "Dubai"],
  ["Samarkand", "Istanbul"],
  ["Samarkand", "Tashkent"],
  ["London", "New York"],
  ["Paris", "New York"],
  ["Frankfurt", "Chicago"],
  ["Madrid", "Miami"],
  ["London", "Singapore"],
  ["London", "Dubai"],
  ["Paris", "Tokyo"],
  ["Berlin", "Warsaw"],
  ["Zurich", "Singapore"],
  ["Dubai", "Singapore"],
  ["Dubai", "Mumbai"],
  ["Dubai", "Johannesburg"],
  ["Dubai", "London"],
  ["Tokyo", "San Francisco"],
  ["Tokyo", "Seoul"],
  ["Tokyo", "Singapore"],
  ["Seoul", "Los Angeles"],
  ["Shanghai", "San Francisco"],
  ["Hong Kong", "London"],
  ["Singapore", "Sydney"],
  ["Sydney", "Melbourne"],
  ["New York", "San Francisco"],
  ["New York", "Los Angeles"],
  ["New York", "Miami"],
  ["New York", "Toronto"],
  ["San Francisco", "Vancouver"],
  ["Miami", "Bogota"],
  ["Bogota", "Sao Paulo"],
  ["Sao Paulo", "Buenos Aires"],
  ["Sao Paulo", "London"],
  ["Cairo", "Dubai"],
  ["Cairo", "Paris"],
  ["Casablanca", "Madrid"],
  ["Nairobi", "Dubai"],
  ["Johannesburg", "Cape Town"],
  ["Almaty", "Astana"],
  ["Baku", "Istanbul"],
  ["Tbilisi", "Frankfurt"]
];

let valid = true;
arcPairs.forEach(([c1, c2]) => {
  if (!cityMap.has(c1)) { console.error('Missing city:', c1); valid = false; }
  if (!cityMap.has(c2)) { console.error('Missing city:', c2); valid = false; }
});

console.log('Total arc routes:', arcPairs.length, 'All valid:', valid);
