"use client";

import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useTexture, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// ============================================================================
// 1. REALISTIC DEEP NEBULA & COSMIC DUST FIELD
// ============================================================================
function CosmicNebulaStars() {
  const starsRef = useRef<THREE.Points>(null);
  const dustRef = useRef<THREE.Points>(null);

  const { starPositions, starColors } = useMemo(() => {
    const count = 1800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const gold = new THREE.Color("#FFD433");
    const white = new THREE.Color("#FFFFFF");
    const blue = new THREE.Color("#90BFFF");

    for (let i = 0; i < count; i++) {
      const r = 26 + Math.random() * 45;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const dice = Math.random();
      const c = dice > 0.75 ? gold : dice > 0.4 ? white : blue;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { starPositions: pos, starColors: col };
  }, []);

  const dustPositions = useMemo(() => {
    const count = 450;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const particleTexture = useTexture("/images/star_particle.png");

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
    if (dustRef.current) {
      dustRef.current.rotation.y = -state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          map={particleTexture}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          map={particleTexture}
          color="#FFD433"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </>
  );
}

// ============================================================================
// 2. CENTRAL VOLUMETRIC GOLD SOLID TARGET PRO AIRPLANE POINTER
// ============================================================================
// The airplane nose points toward +Z in its local model coordinate system.
// We align +Z with the vector pointing to mouse position / active service node!
function CentralAirplanePointer({
  mousePos,
  targetPos3D,
  isAimingService,
}: {
  mousePos: { x: number; y: number };
  targetPos3D: THREE.Vector3 | null;
  isAimingService: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const currentQuat = useRef(new THREE.Quaternion());
  const targetQuat = useRef(new THREE.Quaternion());

  // Use the high-resolution clean gold paper plane from public/images
  const texture = useTexture("/images/gold_paper_plane.png");

  useMemo(() => {
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  // Plane image dimensions (1:1 square canvas 1254x1254 containing the plane)
  const planeSize = 2.4;
  // Precise nose coordinate in local model coordinates (measured from image pixel X=1190, Y=110):
  // Atan2(627 - 110, 1190 - 627) = Atan2(517, 563) = 0.742831 rad (~42.56 deg)
  const baseAngle = 0.742831;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    let targetAngle = 0;
    let tiltX = 0;
    let tiltY = 0;

    if (targetPos3D) {
      // Calculate angle in XY plane directly towards active target service
      const dx = targetPos3D.x - groupRef.current.position.x;
      const dy = targetPos3D.y - groupRef.current.position.y;
      targetAngle = Math.atan2(dy, dx) - baseAngle;

      // Maintain elegant front-facing 3D perspective without flipping backside
      tiltX = -0.08;
      tiltY = 0.05;

      const scale = isAimingService ? 1.25 + Math.sin(t * 8) * 0.04 : 1.05;
      groupRef.current.scale.set(scale, scale, scale);
    } else {
      // Points in direction of mouse cursor
      const dx = mousePos.x * 6.5;
      const dy = mousePos.y * 4.5;
      targetAngle = Math.atan2(dy, dx) - baseAngle;

      // Subtle 3D perspective tilt based on cursor position
      tiltX = -mousePos.y * 0.12;
      tiltY = mousePos.x * 0.12;

      groupRef.current.scale.set(1.0, 1.0, 1.0);
    }

    // Convert to Euler with front-facing constraint:
    // Z is in-plane rotation (pointing to target), X and Y are gentle 3D tilt.
    // The plane always directly faces the user and never exposes reverse/back side!
    targetQuat.current.setFromEuler(new THREE.Euler(tiltX, tiltY, targetAngle, "XYZ"));
    currentQuat.current.slerp(targetQuat.current, isAimingService ? 0.28 : 0.14);
    groupRef.current.quaternion.copy(currentQuat.current);

    groupRef.current.position.y = Math.sin(t * 2.0) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* 
        Layer 1: Back shadow/depth mesh - adds subtle volumetric shadow beneath 
      */}
      <mesh position={[0, -0.03, -0.04]}>
        <planeGeometry args={[planeSize * 0.96, planeSize * 0.96]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.3}
          color="#000000"
          alphaTest={0.02}
        />
      </mesh>

      {/* 
        Layer 2: Front Gold Paper Plane - 100% authentic crisp 3D gloss, 
        always directly facing user, never inverted or showing flat edge!
      */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[planeSize, planeSize]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Volumetric Gold Halo Glow */}
      <pointLight position={[0, 0, 0.8]} color="#FFC200" intensity={isAimingService ? 6 : 3.5} distance={6} />
    </group>
  );
}

// Crisp Native WebGL Texture Renderer with true aspect ratio
function ServiceTextureMesh({
  modelType,
  isTargeted,
}: {
  modelType: string;
  isTargeted: boolean;
}) {
  const texture = useTexture(`/images/services3d/${modelType}.png`);
  const meshRef = useRef<THREE.Group>(null);

  useMemo(() => {
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 4;
    texture.needsUpdate = true;
  }, [texture]);

  const aspect = useMemo(() => {
    if (texture.image && texture.image.width && texture.image.height) {
      return texture.image.width / texture.image.height;
    }
    return 1.5;
  }, [texture]);

  const baseHeight = 1.45;
  const baseWidth = baseHeight * aspect;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = Math.sin(t * 1.8) * 0.04;
  });

  return (
    <group position={[0, 0.45, 0]}>
      {/* 3D Ground/Orbit Shadow underneath the floating icon */}
      <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[Math.min(baseWidth * 0.45, 1.1), 24]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={isTargeted ? 0.65 : 0.35}
        />
      </mesh>

      {/* Dynamic 3D Floating Icon Group */}
      <group ref={meshRef} scale={isTargeted ? 1.14 : 1.0}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[baseWidth, baseHeight]} />
          <meshBasicMaterial
            map={texture}
            transparent
            alphaTest={0.01}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 3. 3D SERVICE NODE WITH INSTANT POINTER SYNCHRONIZATION
// ============================================================================
interface OrbitNodeProps {
  id: number;
  title: string;
  description: string;
  categorySlug: string;
  orbitRadius: number;
  speed: number;
  initialAngle: number;
  modelType: string;
  btnText: string;
  onPositionUpdate: (id: number, pos: THREE.Vector3) => void;
  isTargeted: boolean;
  onHoverStart: (id: number) => void;
  onHoverEnd: () => void;
}

function OrbitNode({
  id,
  title,
  description,
  categorySlug,
  orbitRadius,
  speed,
  initialAngle,
  modelType,
  btnText,
  onPositionUpdate,
  isTargeted,
  onHoverStart,
  onHoverEnd,
}: OrbitNodeProps) {
  const nodeRef = useRef<THREE.Group>(null);
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const tempPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!nodeRef.current) return;

    // Continuous smooth circular carousel motion
    const time = state.clock.elapsedTime * speed * 0.14 + initialAngle;
    const x = Math.cos(time) * orbitRadius;
    const z = Math.sin(time) * orbitRadius;
    const y = Math.sin(time * 2.2 + initialAngle) * 0.28;

    nodeRef.current.position.set(x, y, z);

    // Report 3D world coordinate to central arrow pointer
    tempPos.set(x, y, z);
    onPositionUpdate(id, tempPos);

    // Always face the camera (True 3D Billboard)
    nodeRef.current.quaternion.copy(state.camera.quaternion);
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/services?category=${categorySlug}`);
    }, 280);
  };

  return (
    <group
      ref={nodeRef}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHoverStart(id);
      }}
      onPointerOut={() => {
        onHoverEnd();
      }}
      scale={isTargeted ? 1.25 : isNavigating ? 1.3 : 1.0}
    >
      {/* 100% Sharp Native WebGL 3D Model */}
      <ServiceTextureMesh modelType={modelType} isTargeted={isTargeted} />

      {/* Target Beam / Pointer Beacon ring under icon when targeted */}
      {isTargeted && (
        <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9, 1.02, 32]} />
          <meshBasicMaterial color="#FFC200" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Interactive Multilingual Label: EXPANDS IMMEDIATELY WHEN ARROW TARGETS IT */}
      <Html distanceFactor={8.5} position={[0, -0.92, 0]} center zIndexRange={[100, 0]}>
        <div
          onClick={handleClick}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseEnter={() => onHoverStart(id)}
          onMouseLeave={() => onHoverEnd()}
          className={`cursor-pointer transition-all duration-300 select-none ${
            isTargeted
              ? "w-64 p-3.5 rounded-2xl bg-black/95 border-2 border-gold shadow-[0_0_40px_rgba(255,194,0,0.65)] backdrop-blur-xl scale-105 pointer-events-auto z-50"
              : "px-3.5 py-1.5 rounded-full bg-black/90 border border-gold/40 hover:border-gold backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.85)] pointer-events-auto"
          }`}
        >
          {isTargeted ? (
            <div className="text-left space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-gold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gold animate-ping inline-block" />
                  {title}
                </span>
                <span className="text-[10px] font-mono text-gold/90 font-bold uppercase">
                  ACTIVE
                </span>
              </div>
              <p className="text-[10px] text-white/90 leading-tight line-clamp-2">
                {description}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(e);
                }}
                className="w-full pt-1.5 flex items-center justify-between text-[10px] font-bold text-gold hover:text-white border-t border-white/15 transition-colors cursor-pointer group/btn"
              >
                <span className="uppercase tracking-wider group-hover/btn:underline">{btnText}</span>
                <span className="text-white bg-gold/20 group-hover/btn:bg-gold group-hover/btn:text-black px-2 py-0.5 rounded-full transition-all">
                  →
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#FFC200] shrink-0 animate-pulse" />
              <span className="text-[10.5px] font-black uppercase tracking-wider text-white">
                {title}
              </span>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

// Visual Golden Energy Guidance Ray from Airplane to Targeted Service
function TargetingBeam({
  targetPos,
  active,
}: {
  targetPos: THREE.Vector3 | null;
  active: boolean;
}) {
  const lineRef = useRef<THREE.Line>(null);

  const points = useMemo(() => {
    return [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
  }, []);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  useFrame((state) => {
    if (!active || !targetPos || !lineRef.current) return;
    const posAttr = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;
    if (posAttr) {
      const t = state.clock.elapsedTime;
      const airplaneY = Math.sin(t * 2.0) * 0.08;
      
      // Vector from airplane center (0, airplaneY, 0) to target node
      // Note: The service node icon center is at (targetPos.x, targetPos.y + 0.45, targetPos.z)
      const targetCenterY = targetPos.y + 0.45;
      const dir = new THREE.Vector3(targetPos.x, targetCenterY - airplaneY, targetPos.z).normalize();
      
      // The nose tip of the airplane is at distance ~1.46 in the pointing direction
      const noseDist = 1.46;
      const noseX = dir.x * noseDist;
      const noseY = airplaneY + dir.y * noseDist;
      const noseZ = dir.z * noseDist;

      posAttr.setXYZ(0, noseX, noseY, noseZ);
      posAttr.setXYZ(1, targetPos.x, targetCenterY, targetPos.z);
      posAttr.needsUpdate = true;
    }
  });

  if (!active || !targetPos) return null;

  return (
    // @ts-ignore
    <line ref={lineRef} geometry={lineGeo}>
      <lineBasicMaterial
        color="#FFD433"
        transparent
        opacity={0.55}
        linewidth={2}
      />
    </line>
  );
}

// ============================================================================
// 4. MAIN DIGITAL UNIVERSE CANVAS
// ============================================================================
export default function DigitalUniverse() {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);

  // Real-time 3D positions of all 12 services
  const nodePositions = useRef<Record<number, THREE.Vector3>>({});

  const handlePositionUpdate = (id: number, pos: THREE.Vector3) => {
    if (!nodePositions.current[id]) {
      nodePositions.current[id] = new THREE.Vector3();
    }
    nodePositions.current[id].copy(pos);
  };

  const angleStep = (2 * Math.PI) / 12;
  const servicesConfig = [
    { id: 0, title: t.scene3d.websiteTitle, description: t.scene3d.websiteDesc, slug: "development-technology", radius: 5.6, speed: 0.7, angle: angleStep * 0, model: "website" },
    { id: 1, title: t.scene3d.aiTitle, description: t.scene3d.aiDesc, slug: "development-technology", radius: 5.6, speed: 0.7, angle: angleStep * 1, model: "ai" },
    { id: 2, title: t.scene3d.smmTitle, description: t.scene3d.smmDesc, slug: "smm-promotion", radius: 5.6, speed: 0.7, angle: angleStep * 2, model: "smm" },
    { id: 3, title: t.scene3d.botTitle, description: t.scene3d.botDesc, slug: "development-technology", radius: 5.6, speed: 0.7, angle: angleStep * 3, model: "bot" },
    { id: 4, title: t.scene3d.seoTitle, description: t.scene3d.seoDesc, slug: "seo-traffic", radius: 5.6, speed: 0.7, angle: angleStep * 4, model: "seo" },
    { id: 5, title: t.scene3d.designTitle, description: t.scene3d.designDesc, slug: "design-creative", radius: 5.6, speed: 0.7, angle: angleStep * 5, model: "design" },
    { id: 6, title: t.scene3d.videoTitle, description: t.scene3d.videoDesc, slug: "media-advertising", radius: 5.6, speed: 0.7, angle: angleStep * 6, model: "video" },
    { id: 7, title: t.scene3d.marketingTitle, description: t.scene3d.marketingDesc, slug: "social-media", radius: 5.6, speed: 0.7, angle: angleStep * 7, model: "marketing" },
    { id: 8, title: t.scene3d.ecommerceTitle, description: t.scene3d.ecommerceDesc, slug: "development-technology", radius: 5.6, speed: 0.7, angle: angleStep * 8, model: "ecommerce" },
    { id: 9, title: t.scene3d.softwareDevTitle, description: t.scene3d.softwareDevDesc, slug: "development-technology", radius: 5.6, speed: 0.7, angle: angleStep * 9, model: "software" },
    { id: 10, title: t.scene3d.itTitle, description: t.scene3d.itDesc, slug: "it-technical-services", radius: 5.6, speed: 0.7, angle: angleStep * 10, model: "it" },
    { id: 11, title: t.scene3d.printingTitle, description: t.scene3d.printingDesc, slug: "printing", radius: 5.6, speed: 0.7, angle: angleStep * 11, model: "printing" },
  ];

  // Calculate target position: either explicitly hovered service node, or nearest service along mouse ray
  const activeTargetPos = useMemo(() => {
    if (hoveredNodeId !== null && nodePositions.current[hoveredNodeId]) {
      return nodePositions.current[hoveredNodeId];
    }
    return null;
  }, [hoveredNodeId]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });

    // Proximity search: find closest service to cursor ray when not explicitly hovering badge
    if (hoveredNodeId === null) {
      let closestId: number | null = null;
      let minAngleDist = 0.55; // Angle threshold ~31 degrees

      // Target direction in 2D normalized screen space
      const cursorAngle = Math.atan2(y, x);

      servicesConfig.forEach((s) => {
        const pos = nodePositions.current[s.id];
        if (pos) {
          // Project 3D pos to approximate view plane
          const nodeAngle = Math.atan2(pos.y, pos.x);
          let diff = Math.abs(cursorAngle - nodeAngle);
          if (diff > Math.PI) diff = 2 * Math.PI - diff;

          if (diff < minAngleDist) {
            minAngleDist = diff;
            closestId = s.id;
          }
        }
      });

      if (closestId !== null) {
        setHoveredNodeId(closestId);
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredNodeId(null);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[540px] sm:h-[640px] md:h-[780px] lg:h-[840px] cursor-crosshair overflow-hidden select-none"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 5.0, 13.5], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          precision: "mediump",
        }}
      >
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
          rotateSpeed={0.4}
        />

        <ambientLight intensity={2.2} />
        <directionalLight position={[10, 15, 8]} intensity={3.0} color="#FFFFFF" />
        <directionalLight position={[-8, -3, -5]} intensity={1.8} color="#FFD433" />
        <pointLight position={[0, 0, 0]} color="#FFC200" intensity={4.5} distance={18} />

        {/* Realistic Cosmic Nebula & Starfield */}
        <CosmicNebulaStars />

        <Suspense fallback={null}>
          {/* Central Volumetric Gold Metal Airplane Pointing Exactly at Mouse/Service */}
          <CentralAirplanePointer
            mousePos={mousePos}
            targetPos3D={activeTargetPos}
            isAimingService={hoveredNodeId !== null}
          />

          {/* Guidance Laser Beam from Airplane to Target Service */}
          <TargetingBeam
            targetPos={activeTargetPos}
            active={hoveredNodeId !== null}
          />

          {/* All 12 High-Definition 3D Icons Rotating Around Center */}
          {servicesConfig.map((item) => (
            <OrbitNode
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              categorySlug={item.slug}
              orbitRadius={item.radius}
              speed={item.speed}
              initialAngle={item.angle}
              modelType={item.model}
              btnText={t.scene3d.btnDetails}
              onPositionUpdate={handlePositionUpdate}
              isTargeted={hoveredNodeId === item.id}
              onHoverStart={(id) => setHoveredNodeId(id)}
              onHoverEnd={() => setHoveredNodeId(null)}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* Cinematic Vignette Overlays */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/75 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/40 to-transparent" />
    </div>
  );
}
