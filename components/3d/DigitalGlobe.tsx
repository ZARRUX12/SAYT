"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { isRealEarthLand } from "./earthMapData";

// Generate realistic continent particle coordinates with gold, electric blue, and client hubs
function CyberGlobeSphere() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const satellitesGroupRef = useRef<THREE.Group>(null);
  const satellitesGroupRef2 = useRef<THREE.Group>(null);
  const pulseGroupRef = useRef<THREE.Group>(null);
  const [lettersProgress, setLettersProgress] = React.useState<number[]>(new Array(10).fill(1));
  const [pulseScale, setPulseScale] = React.useState<number>(1);

  // 1. Coordinates of real world major client cities across continents
  // lon/lat to 3D Cartesian coordinates on sphere radius R
  const clientCities = useMemo(() => {
    const R = 2.0;
    const toCartesian = (lat: number, lon: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -R * Math.sin(phi) * Math.cos(theta),
        R * Math.cos(phi),
        R * Math.sin(phi) * Math.sin(theta)
      );
    };

    return [
      // Central Asia / Headquarters & Regional Hubs
      { name: "Samarkand", pos: toCartesian(39.65, 66.96), color: "#FFFFFF", main: true },
      { name: "Tashkent", pos: toCartesian(41.31, 69.24), color: "#FFFFFF", main: true },
      { name: "Bukhara", pos: toCartesian(39.77, 64.42), color: "#FFFFFF" },
      { name: "Andijan", pos: toCartesian(40.78, 72.34), color: "#FFFFFF" },
      { name: "Almaty", pos: toCartesian(43.24, 76.91), color: "#FFFFFF" },
      { name: "Astana", pos: toCartesian(51.17, 71.43), color: "#FFFFFF" },
      { name: "Bishkek", pos: toCartesian(42.87, 74.59), color: "#FFFFFF" },
      { name: "Dushanbe", pos: toCartesian(38.56, 68.78), color: "#FFFFFF" },
      { name: "Baku", pos: toCartesian(40.41, 49.87), color: "#FFFFFF" },
      { name: "Tbilisi", pos: toCartesian(41.72, 44.78), color: "#FFFFFF" },

      // Middle East & West Asia
      { name: "Dubai", pos: toCartesian(25.20, 55.27), color: "#FFFFFF" },
      { name: "Abu Dhabi", pos: toCartesian(24.45, 54.38), color: "#FFFFFF" },
      { name: "Riyadh", pos: toCartesian(24.71, 46.68), color: "#FFFFFF" },
      { name: "Doha", pos: toCartesian(25.29, 51.53), color: "#FFFFFF" },
      { name: "Istanbul", pos: toCartesian(41.01, 28.98), color: "#FFFFFF" },

      // East & South Asia
      { name: "Tokyo", pos: toCartesian(35.68, 139.69), color: "#FFFFFF" },
      { name: "Seoul", pos: toCartesian(37.57, 126.98), color: "#FFFFFF" },
      { name: "Singapore", pos: toCartesian(1.35, 103.82), color: "#FFFFFF" },
      { name: "Kuala Lumpur", pos: toCartesian(3.14, 101.69), color: "#FFFFFF" },
      { name: "Bangkok", pos: toCartesian(13.76, 100.50), color: "#FFFFFF" },
      { name: "Shanghai", pos: toCartesian(31.23, 121.47), color: "#FFFFFF" },
      { name: "Hong Kong", pos: toCartesian(22.32, 114.17), color: "#FFFFFF" },
      { name: "Mumbai", pos: toCartesian(19.08, 72.88), color: "#FFFFFF" },

      // Europe
      { name: "London", pos: toCartesian(51.51, -0.13), color: "#FFFFFF" },
      { name: "Paris", pos: toCartesian(48.86, 2.35), color: "#FFFFFF" },
      { name: "Berlin", pos: toCartesian(52.52, 13.41), color: "#FFFFFF" },
      { name: "Frankfurt", pos: toCartesian(50.11, 8.68), color: "#FFFFFF" },
      { name: "Amsterdam", pos: toCartesian(52.37, 4.89), color: "#FFFFFF" },
      { name: "Zurich", pos: toCartesian(47.38, 8.54), color: "#FFFFFF" },
      { name: "Vienna", pos: toCartesian(48.21, 16.37), color: "#FFFFFF" },
      { name: "Milan", pos: toCartesian(45.46, 9.19), color: "#FFFFFF" },
      { name: "Madrid", pos: toCartesian(40.42, -3.70), color: "#FFFFFF" },
      { name: "Stockholm", pos: toCartesian(59.33, 18.07), color: "#FFFFFF" },
      { name: "Oslo", pos: toCartesian(59.91, 10.75), color: "#FFFFFF" },
      { name: "Warsaw", pos: toCartesian(52.23, 21.01), color: "#FFFFFF" },

      // North America
      { name: "New York", pos: toCartesian(40.71, -74.01), color: "#FFFFFF" },
      { name: "San Francisco", pos: toCartesian(37.77, -122.42), color: "#FFFFFF" },
      { name: "Los Angeles", pos: toCartesian(34.05, -118.24), color: "#FFFFFF" },
      { name: "Chicago", pos: toCartesian(41.88, -87.63), color: "#FFFFFF" },
      { name: "Miami", pos: toCartesian(25.76, -80.19), color: "#FFFFFF" },
      { name: "Toronto", pos: toCartesian(43.65, -79.38), color: "#FFFFFF" },
      { name: "Vancouver", pos: toCartesian(49.28, -123.12), color: "#FFFFFF" },

      // South America
      { name: "Sao Paulo", pos: toCartesian(-23.55, -46.63), color: "#FFFFFF" },
      { name: "Buenos Aires", pos: toCartesian(-34.60, -58.38), color: "#FFFFFF" },
      { name: "Santiago", pos: toCartesian(-33.45, -70.67), color: "#FFFFFF" },
      { name: "Bogota", pos: toCartesian(4.71, -74.07), color: "#FFFFFF" },

      // Africa
      { name: "Cairo", pos: toCartesian(30.04, 31.24), color: "#FFFFFF" },
      { name: "Johannesburg", pos: toCartesian(-26.20, 28.05), color: "#FFFFFF" },
      { name: "Cape Town", pos: toCartesian(-33.92, 18.42), color: "#FFFFFF" },
      { name: "Casablanca", pos: toCartesian(33.57, -7.59), color: "#FFFFFF" },
      { name: "Nairobi", pos: toCartesian(-1.29, 36.82), color: "#FFFFFF" },

      // Oceania
      { name: "Sydney", pos: toCartesian(-33.87, 151.21), color: "#FFFFFF" },
      { name: "Melbourne", pos: toCartesian(-37.81, 144.96), color: "#FFFFFF" },
    ];
  }, []);

  // 2. Generate High-Density Electric Cyan Cyber Earth Continents (45,000 samples)
  const { points, colors } = useMemo(() => {
    const pts: number[] = [];
    const cols: number[] = [];
    const count = 45000;
    const R = 2.0;

    // Glowing electric blue / cyan cyber palette matching reference
    const cPrimaryCyan = new THREE.Color("#00E5FF");   // Bright electric cyan (main)
    const cBrightIce = new THREE.Color("#80F0FF");     // Icy cyan highlight
    const cWhite = new THREE.Color("#FFFFFF");         // Pure intense core nodes
    const cDeepElectric = new THREE.Color("#0091FF");  // Deep electric blue

    for (let i = 0; i < count; i++) {
      const yVal = 1 - (i / (count - 1)) * 2;
      const phi = Math.acos(yVal);
      const lat = 90 - (phi * 180) / Math.PI;

      const theta = i * 2.399963229728653;
      const deg = (theta * 180) / Math.PI;
      // Formula matching clientCities coordinate system exactly
      const lon = (((deg % 360) + 360) % 360) - 180;

      if (isRealEarthLand(lat, lon)) {
        const x = -R * Math.sin(phi) * Math.cos(theta);
        const y = R * Math.cos(phi);
        const z = R * Math.sin(phi) * Math.sin(theta);

        pts.push(x, y, z);

        // Cyber continental luminescence: vibrant neon cyan with icy white accents
        let c = cPrimaryCyan;
        if (i % 6 === 0) {
          c = cWhite;
        } else if (i % 4 === 0) {
          c = cBrightIce;
        } else if (i % 7 === 0) {
          c = cDeepElectric;
        }
        cols.push(c.r, c.g, c.b);
      }
    }
    return {
      points: new Float32Array(pts),
      colors: new Float32Array(cols),
    };
  }, []);

  // 3. Realistic Intercontinental Flight & Network Arcs connecting major global hubs
  const { arcGeometries, arcCurves } = useMemo(() => {
    // City map for fast lookup
    const cityMap = new Map<string, THREE.Vector3>();
    clientCities.forEach((c) => cityMap.set(c.name, c.pos));

    // Curated high-traffic intercontinental routes connecting East, West, Middle East, Asia, Americas
    const routes: [string, string][] = [
      // Central Asia / Tashkent HQ outward links
      ["Tashkent", "Dubai"],
      ["Tashkent", "Istanbul"],
      ["Tashkent", "London"],
      ["Tashkent", "Frankfurt"],
      ["Tashkent", "Shanghai"],
      ["Tashkent", "Seoul"],
      ["Tashkent", "Almaty"],
      ["Tashkent", "Baku"],
      ["Samarkand", "Dubai"],
      ["Samarkand", "Istanbul"],

      // Transatlantic & European trunk lines
      ["London", "New York"],
      ["Paris", "New York"],
      ["Frankfurt", "Chicago"],
      ["London", "Singapore"],
      ["London", "Dubai"],
      ["Frankfurt", "Tokyo"],
      ["Paris", "Sao Paulo"],
      ["Madrid", "Buenos Aires"],
      ["London", "Johannesburg"],
      ["Amsterdam", "Singapore"],

      // Transpacific & Asian trunk lines
      ["Tokyo", "San Francisco"],
      ["Tokyo", "Los Angeles"],
      ["Seoul", "Los Angeles"],
      ["Shanghai", "San Francisco"],
      ["Hong Kong", "Vancouver"],
      ["Singapore", "Sydney"],
      ["Tokyo", "Sydney"],
      ["Hong Kong", "London"],
      ["Singapore", "Dubai"],
      ["Bangkok", "Dubai"],
      ["Mumbai", "London"],
      ["Mumbai", "Dubai"],

      // Middle East bridges
      ["Dubai", "New York"],
      ["Dubai", "Singapore"],
      ["Dubai", "Tokyo"],
      ["Dubai", "Johannesburg"],
      ["Istanbul", "Berlin"],
      ["Istanbul", "Cairo"],
      ["Riyadh", "London"],
      ["Doha", "Singapore"],

      // Pan-American & African routes
      ["New York", "Los Angeles"],
      ["New York", "Sao Paulo"],
      ["New York", "Miami"],
      ["San Francisco", "Miami"],
      ["Miami", "Bogota"],
      ["Sao Paulo", "Buenos Aires"],
      ["Johannesburg", "Nairobi"],
      ["Cairo", "Paris"],
      ["Sydney", "Melbourne"],
    ];

    const curves: THREE.QuadraticBezierCurve3[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    routes.forEach(([fromName, toName]) => {
      const p1 = cityMap.get(fromName);
      const p2 = cityMap.get(toName);
      if (!p1 || !p2) return;

      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const dist = p1.distanceTo(p2);
      // Lift arc higher above Earth surface based on distance
      const lift = Math.min(0.85, Math.max(0.35, dist * 0.28));
      const normal = mid.clone().normalize();
      const control = normal.multiplyScalar(2.0 + lift);

      const curve = new THREE.QuadraticBezierCurve3(p1, control, p2);
      curves.push(curve);
      const pts = curve.getPoints(45);
      geometries.push(new THREE.BufferGeometry().setFromPoints(pts));
    });

    return { arcGeometries: geometries, arcCurves: curves };
  }, [clientCities]);

  // Traveling light pulses on connection arcs
  const pulseBeadsRef = useRef<THREE.InstancedMesh>(null);

  // Background floating stars & cyan digital dust
  const backgroundDust = useMemo(() => {
    const count = 220;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const colorCyan = new THREE.Color("#00E5FF");
    const colorWhite = new THREE.Color("#FFFFFF");
    const colorDeep = new THREE.Color("#0088FF");

    for (let i = 0; i < count; i++) {
      const r = 2.3 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const c = i % 4 === 0 ? colorWhite : i % 2 === 0 ? colorCyan : colorDeep;
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return { pos, cols };
  }, []);

  // Letters of "TARGET PRO"
  const letters = useMemo(() => ["T", "A", "R", "G", "E", "T", " ", "P", "R", "O"], []);

  const dummyMatrix = useMemo(() => new THREE.Matrix4(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const loopT = t % 10.0; // 10-second seamless cycle

    // Sphere gentle realistic rotation
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y = t * 0.08;
      globeGroupRef.current.rotation.x = Math.sin(t * 0.25) * 0.02;
    }

    // Orbiting rings
    if (satellitesGroupRef.current) {
      satellitesGroupRef.current.rotation.y = -t * 0.2;
      satellitesGroupRef.current.rotation.z = Math.sin(t * 0.15) * 0.1;
    }
    if (satellitesGroupRef2.current) {
      satellitesGroupRef2.current.rotation.y = t * 0.15;
      satellitesGroupRef2.current.rotation.x = 0.5 + Math.cos(t * 0.12) * 0.1;
    }

    // Radial client node radio waves expansion
    const wave = 1 + ((t * 1.5) % 1.0) * 0.8;
    setPulseScale(wave);

    // Update traveling light pulses on arcs
    if (pulseBeadsRef.current && arcCurves.length > 0) {
      arcCurves.forEach((curve, idx) => {
        const speed = 0.45;
        const offset = idx * 0.09;
        const progress = (t * speed + offset) % 1.0;

        const pointOnCurve = curve.getPoint(progress);
        const scale = 0.038 * (1 + Math.sin(progress * Math.PI) * 0.5);

        dummyMatrix.makeTranslation(pointOnCurve.x, pointOnCurve.y, pointOnCurve.z);
        dummyMatrix.scale(new THREE.Vector3(scale, scale, scale));
        pulseBeadsRef.current?.setMatrixAt(idx, dummyMatrix);
      });
      pulseBeadsRef.current.instanceMatrix.needsUpdate = true;
    }

    // TARGET PRO smooth appearance and disappearance
    let opacityVal = 0;
    if (loopT < 1.5) {
      opacityVal = loopT / 1.5;
    } else if (loopT >= 1.5 && loopT < 8.0) {
      opacityVal = 1.0;
    } else if (loopT >= 8.0 && loopT < 9.5) {
      opacityVal = (9.5 - loopT) / 1.5;
    } else {
      opacityVal = 0;
    }
    opacityVal = Math.max(0, Math.min(1, opacityVal));

    const newProgress = new Array(letters.length).fill(opacityVal);

    let changed = false;
    for (let i = 0; i < lettersProgress.length; i++) {
      if (Math.abs(newProgress[i] - lettersProgress[i]) > 0.03) {
        changed = true;
        break;
      }
    }
    if (changed) {
      setLettersProgress(newProgress);
    }
  });

  return (
    <>
      {/* Central TARGET PRO Global Branding Aura */}
      <group position={[0, 0, 0]}>
        <Html
          center
          distanceFactor={4.8}
          position={[0, 0, 0]}
          style={{
            pointerEvents: "none",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
          }}
        >
          <div className="flex items-center justify-center select-none font-black tracking-[0.28em] text-center relative">
            {/* Ambient Cyan/Gold Core Aura */}
            <div
              className="absolute -inset-10 rounded-full bg-[#00E5FF]/20 blur-2xl pointer-events-none transition-opacity duration-500"
              style={{ opacity: lettersProgress[0] ?? 1 }}
            />

            {letters.map((char, i) => {
              const p = lettersProgress[i] ?? 1;
              if (char === " ") {
                return <span key={i} className="w-4 inline-block" />;
              }
              return (
                <span
                  key={i}
                  style={{
                    opacity: p,
                    filter:
                      p < 0.99
                        ? `blur(${(1 - p) * 4}px) drop-shadow(0 0 16px rgba(0, 229, 255, ${p}))`
                        : `drop-shadow(0 0 20px rgba(0, 229, 255, 0.9)) drop-shadow(0 0 35px rgba(0, 145, 255, 0.6))`,
                    transition: "opacity 0.2s ease-in-out",
                  }}
                  className="inline-block text-2xl sm:text-3xl font-extrabold bg-gradient-to-b from-[#FFFFFF] via-[#80F0FF] to-[#00B4D8] bg-clip-text text-transparent relative z-10"
                >
                  {char}
                </span>
              );
            })}
          </div>
        </Html>
      </group>

      <group ref={globeGroupRef}>
        {/* Deep Oceanic Cyber Earth Core */}
        <mesh>
          <sphereGeometry args={[1.98, 64, 64]} />
          <meshStandardMaterial
            color="#020817"
            roughness={0.7}
            metalness={0.3}
            emissive="#002244"
            emissiveIntensity={0.65}
          />
        </mesh>

        {/* Luminous Atmospheric Outer Halo (Volumetric Cyber Glow) */}
        <mesh>
          <sphereGeometry args={[2.14, 64, 64]} />
          <meshBasicMaterial
            color="#00B4FF"
            transparent
            opacity={0.28}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* High-Fidelity Continents Particle Matrix - Electric Neon Cyan */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[points, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.042}
            vertexColors
            transparent
            opacity={0.92}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>

        {/* Background Floating Stars & Space Dust */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[backgroundDust.pos, 3]} />
            <bufferAttribute attach="attributes-color" args={[backgroundDust.cols, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            vertexColors
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>

        {/* Global Coordinate Grid (Latitude & Longitude) */}
        {[-1.3, -0.7, 0, 0.7, 1.3].map((y, idx) => {
          const r = Math.sqrt(Math.max(0.1, 4.0 - y * y));
          return (
            <mesh key={`lat-${idx}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[r - 0.003, r + 0.003, 72]} />
              <meshBasicMaterial
                color="#00E5FF"
                transparent
                opacity={0.16}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          );
        })}

        {[0, 60, 120].map((deg, idx) => (
          <group key={`long-${idx}`} rotation={[0, (deg * Math.PI) / 180, 0]}>
            <mesh>
              <ringGeometry args={[1.997, 2.003, 72]} />
              <meshBasicMaterial
                color="#00A3FF"
                transparent
                opacity={0.14}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        ))}

        {/* Intercontinental Flight & Network Arcs */}
        {arcGeometries.map((geo, idx) => (
          <lineSegments key={`arc-${idx}`}>
            <bufferGeometry {...geo} />
            <lineBasicMaterial
              color={idx % 2 === 0 ? "#00E5FF" : "#80F0FF"}
              transparent
              opacity={0.65}
              blending={THREE.AdditiveBlending}
            />
          </lineSegments>
        ))}

        {/* Traveling Energy Pulses along Arcs */}
        {arcCurves.length > 0 && (
          <instancedMesh
            ref={pulseBeadsRef}
            args={[undefined, undefined, arcCurves.length]}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#00F0FF"
              emissiveIntensity={4.5}
            />
          </instancedMesh>
        )}

        {/* Client City Nodes with Glowing Halos */}
        {clientCities.map((city, idx) => (
          <group key={`city-${idx}`} position={city.pos.toArray()}>
            {/* Core Glowing White City Node */}
            <mesh>
              <sphereGeometry args={[city.main ? 0.024 : 0.016, 16, 16]} />
              <meshStandardMaterial
                color="#FFFFFF"
                emissive="#FFFFFF"
                emissiveIntensity={4.5}
              />
            </mesh>

            {/* Cyan Halo Ring */}
            <mesh>
              <ringGeometry args={[0.026, 0.034, 24]} />
              <meshBasicMaterial
                color="#00E5FF"
                side={THREE.DoubleSide}
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Expanding Pulse Ring (Radio Signal Wave) */}
            <mesh scale={[pulseScale, pulseScale, 1]}>
              <ringGeometry args={[0.034, 0.042, 24]} />
              <meshBasicMaterial
                color="#80F0FF"
                side={THREE.DoubleSide}
                transparent
                opacity={Math.max(0, 1.4 - pulseScale)}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        ))}

        {/* Orbiting Satellite Relay Rings */}
        <group ref={satellitesGroupRef} rotation={[0.4, 0, 0.3]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.28, 2.29, 90]} />
            <meshBasicMaterial color="#00E5FF" transparent opacity={0.35} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh position={[2.285, 0, 0]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#00E5FF" emissiveIntensity={4.0} />
          </mesh>
        </group>

        <group ref={satellitesGroupRef2} rotation={[-0.5, 0.3, -0.4]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.36, 2.37, 90]} />
            <meshBasicMaterial color="#00A3FF" transparent opacity={0.3} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh position={[-2.365, 0, 0]}>
            <sphereGeometry args={[0.02, 12, 12]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#00F0FF" emissiveIntensity={4.0} />
          </mesh>
        </group>

        {/* Ambient & Volumetric Cyan Glow Lighting */}
        <pointLight color="#00E5FF" intensity={5.0} distance={6} position={[0, 0, 2.2]} />
        <pointLight color="#0091FF" intensity={3.5} distance={5} position={[0, 0.8, 0.5]} />
      </group>
    </>
  );
}

export default function DigitalGlobe() {
  const { language } = useLanguage();

  const content = {
    ru: {
      tag: "ЦИФРОВАЯ СЕТЬ И ИНФРАСТРУКТУРА",
      title: "Высоконагруженная экосистема 24/7",
      desc: "Наши серверные архитектуры, рекламные кампании и автономные AI-агенты обеспечивают бесперебойный трафик, стабильность 99.9% и непрерывный рост конверсий.",
      metric1: "99.9% Аптайм",
      metric1Sub: "Отказоустойчивые серверы",
      metric2: "24 / 7 Трафик",
      metric2Sub: "Автоматизированные воронки",
      metric3: "End-to-End",
      metric3Sub: "Единая архитектура под ключ",
    },
    uz: {
      tag: "RAQAMLI TARMOQ VA INFRATUZILMA",
      title: "Yuqori yuklamali 24/7 ekotizim",
      desc: "Bizning server arxitekturalarimiz, reklama kampaniyalari va avtonom AI agentlarimiz uzluksiz trafik, 99.9% barqarorlik va konversiyalar o‘sishini ta’minlaydi.",
      metric1: "99.9% Barqarorlik",
      metric1Sub: "Xavfsiz server infratuzilmasi",
      metric2: "24 / 7 Trafik",
      metric2Sub: "Avtomatlashtirilgan tizim",
      metric3: "To‘liq sikl",
      metric3Sub: "Yagona ekotizim kafolati",
    },
    en: {
      tag: "GLOBAL DIGITAL NETWORK & ARCHITECTURE",
      title: "High-Load Digital Ecosystem 24/7",
      desc: "Resilient cloud server architectures, precision performance advertising, and autonomous AI agents guaranteeing 99.9% SLA stability and continuous revenue expansion.",
      metric1: "99.9% SLA Uptime",
      metric1Sub: "Zero-downtime clusters",
      metric2: "24 / 7 Continuous Run",
      metric2Sub: "Autonomous pipelines",
      metric3: "End-to-End",
      metric3Sub: "Full-stack turnkey delivery",
    },
  }[language];

  return (
    <section className="py-24 relative overflow-hidden bg-transparent border-t border-white/5">
      {/* Subtle Background Radial Gold Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Information & Metrics */}
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
              {content.tag}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              {content.title}
            </h2>
            <p className="text-xs sm:text-sm text-metallic leading-relaxed max-w-xl">
              {content.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-dark/60 border border-white/5 shadow-glass">
                <div className="text-2xl font-black text-gold font-mono">99.9%</div>
                <div className="text-xs font-bold text-white mt-1">{content.metric1}</div>
                <div className="text-[10px] text-metallic/60 font-mono mt-0.5">{content.metric1Sub}</div>
              </div>
              <div className="p-4 rounded-xl bg-dark/60 border border-white/5 shadow-glass">
                <div className="text-2xl font-black text-white font-mono">24 / 7</div>
                <div className="text-xs font-bold text-white mt-1">{content.metric2}</div>
                <div className="text-[10px] text-metallic/60 font-mono mt-0.5">{content.metric2Sub}</div>
              </div>
              <div className="p-4 rounded-xl bg-dark/60 border border-white/5 shadow-glass">
                <div className="text-2xl font-black text-gold font-mono">End-to-End</div>
                <div className="text-xs font-bold text-white mt-1">{content.metric3}</div>
                <div className="text-[10px] text-metallic/60 font-mono mt-0.5">{content.metric3Sub}</div>
              </div>
            </div>
          </div>

          {/* Luxury 3D Cyber Globe - Camera zoomed slightly out so rings and lines never clip */}
          <div className="relative w-full h-[460px] sm:h-[560px] flex items-center justify-center overflow-visible">
            <Canvas camera={{ position: [0, 0.3, 7.2], fov: 42 }} gl={{ antialias: true, alpha: true }}>
              <ambientLight intensity={1.2} />
              <directionalLight position={[6, 8, 6]} intensity={3.0} color="#FFFFFF" />
              <directionalLight position={[-6, -4, -4]} intensity={1.5} color="#FFC200" />
              <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.35}>
                <CyberGlobeSphere />
              </Float>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
