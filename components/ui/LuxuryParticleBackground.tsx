"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  prevX: number;
  prevY: number;
  size: number;
  baseSize: number;
  color: string;
  baseOpacity: number;
  opacity: number;
  layer: 1 | 2 | 3;
  pulseProgress: number;
  isPulsing: boolean;
  pulseDuration: number;
  pulseTimer: number;
}

export default function LuxuryParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let mouseSpeed = 0;
    let lastMouseX = -9999;
    let lastMouseY = -9999;
    let isTouch = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const getCounts = () => {
      const w = window.innerWidth;
      const cores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;
      const isLowPower = cores <= 2;

      if (w > 1024) {
        return isLowPower
          ? { l1: 600, l2: 400, l3: 120 }
          : { l1: 1000, l2: 700, l3: 200 };
      } else if (w > 640) {
        return { l1: 600, l2: 400, l3: 120 };
      } else {
        return { l1: 300, l2: 180, l3: 60 };
      }
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      const counts = getCounts();
      particles = [];

      for (let i = 0; i < counts.l1; i++) {
        const size = 0.8 + Math.random() * 1.2;
        const speed = 0.05 + Math.random() * 0.15;
        const angle = Math.random() * Math.PI * 2;
        const isGold = Math.random() > 0.3;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed,
          prevX: 0,
          prevY: 0,
          size,
          baseSize: size,
          color: isGold ? "#FFC200" : "#E5A900",
          baseOpacity: 0.35 + Math.random() * 0.45,
          opacity: 0.35 + Math.random() * 0.45,
          layer: 1,
          pulseProgress: 0,
          isPulsing: false,
          pulseDuration: 60 + Math.random() * 60,
          pulseTimer: Math.random() * 300,
        });
      }

      for (let i = 0; i < counts.l2; i++) {
        const size = 1.3 + Math.random() * 1.8;
        const speed = 0.12 + Math.random() * 0.22;
        const angle = Math.random() * Math.PI * 2;
        const isBrightGold = Math.random() > 0.35;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed,
          prevX: 0,
          prevY: 0,
          size,
          baseSize: size,
          color: isBrightGold ? "#FFD53D" : "#FFC200",
          baseOpacity: 0.6 + Math.random() * 0.35,
          opacity: 0.6 + Math.random() * 0.35,
          layer: 2,
          pulseProgress: 0,
          isPulsing: false,
          pulseDuration: 60 + Math.random() * 50,
          pulseTimer: Math.random() * 250,
        });
      }

      for (let i = 0; i < counts.l3; i++) {
        const size = 2.2 + Math.random() * 2.8;
        const speed = 0.25 + Math.random() * 0.35;
        const angle = Math.random() * Math.PI * 2;
        const isWhiteCore = Math.random() > 0.45;
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed,
          prevX: x,
          prevY: y,
          size,
          baseSize: size,
          color: isWhiteCore ? "#FFF8D6" : "#FFDF66",
          baseOpacity: 0.85 + Math.random() * 0.15,
          opacity: 0.85 + Math.random() * 0.15,
          layer: 3,
          pulseProgress: 0,
          isPulsing: false,
          pulseDuration: 45 + Math.random() * 45,
          pulseTimer: Math.random() * 180,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      isTouch = false;
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isTouch = true;
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (targetMouseX > -9000) {
        if (mouseX < -9000) {
          mouseX = targetMouseX;
          mouseY = targetMouseY;
        } else {
          mouseX += (targetMouseX - mouseX) * 0.15;
          mouseY += (targetMouseY - mouseY) * 0.15;
        }
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        mouseSpeed = Math.min(Math.sqrt(dx * dx + dy * dy), 30);
        lastMouseX = mouseX;
        lastMouseY = mouseY;
      } else {
        mouseX = -9999;
        mouseY = -9999;
        mouseSpeed = 0;
      }

      ctx.clearRect(0, 0, width, height);

      if (mouseX > -9000) {
        const glowRadius = isTouch ? 150 : 190;
        const grad = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          glowRadius
        );
        grad.addColorStop(0, "rgba(255, 194, 0, 0.08)");
        grad.addColorStop(0.5, "rgba(255, 194, 0, 0.03)");
        grad.addColorStop(1, "rgba(255, 194, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (prefersReducedMotion) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
        return;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.prevX = p.x;
        p.prevY = p.y;

        p.pulseTimer -= 1;
        if (p.pulseTimer <= 0) {
          p.isPulsing = true;
          p.pulseProgress = 0;
          p.pulseTimer = 300 + Math.random() * 500;
        }

        if (p.isPulsing) {
          p.pulseProgress += 1 / p.pulseDuration;
          if (p.pulseProgress >= 1) {
            p.isPulsing = false;
            p.size = p.baseSize;
            p.opacity = p.baseOpacity;
          } else {
            const wave = Math.sin(p.pulseProgress * Math.PI);
            p.size = p.baseSize * (1 + wave * 0.4);
            p.opacity = Math.min(1.0, p.baseOpacity * (1 + wave * 0.35));
          }
        }

        p.baseVx += (Math.random() - 0.5) * 0.008;
        p.baseVy += (Math.random() - 0.5) * 0.008;
        const maxBaseSpeed = p.layer === 1 ? 0.2 : p.layer === 2 ? 0.4 : 0.7;
        const currentSpeed = Math.sqrt(p.baseVx * p.baseVx + p.baseVy * p.baseVy);
        if (currentSpeed > maxBaseSpeed) {
          p.baseVx = (p.baseVx / currentSpeed) * maxBaseSpeed;
          p.baseVy = (p.baseVy / currentSpeed) * maxBaseSpeed;
        }

        if (mouseX > -9000) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;

          if (p.layer === 1) {
            const r1 = 120;
            if (distSq < r1 * r1 && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / r1) * 0.04;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          } else if (p.layer === 2) {
            const r2 = isTouch ? 180 : 230;
            if (distSq < r2 * r2 && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const speedBoost = 1 + mouseSpeed * 0.04;
              const force = (1 - dist / r2) * 0.65 * speedBoost;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          } else if (p.layer === 3) {
            const r3 = isTouch ? 220 : 290;
            if (distSq < r3 * r3 && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const speedBoost = 1 + mouseSpeed * 0.08;
              const force = (1 - dist / r3) * 1.35 * speedBoost;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }
        }

        const returnFactor = p.layer === 3 ? 0.035 : 0.05;
        p.vx += (p.baseVx - p.vx) * returnFactor;
        p.vy += (p.baseVy - p.vy) * returnFactor;

        p.x += p.vx * (dt * 60);
        p.y += p.vy * (dt * 60);

        const pad = 20;
        if (p.x < -pad) {
          p.x = width + pad;
          p.prevX = p.x;
        } else if (p.x > width + pad) {
          p.x = -pad;
          p.prevX = p.x;
        }
        if (p.y < -pad) {
          p.y = height + pad;
          p.prevY = p.y;
        } else if (p.y > height + pad) {
          p.y = -pad;
          p.prevY = p.y;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        if (p.layer === 3) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#FFC200";
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none w-full h-full"
      style={{
        zIndex: 0,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
