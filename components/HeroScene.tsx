"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  /** "full" = denser star field over the hero, "mini" = lighter for the CTA */
  variant?: "full" | "mini";
}

/**
 * Particle star field. No planet curve — the hero now uses a real
 * background image. Pointer-events: none so the canvas never blocks
 * click/scroll. Geometries + materials disposed on unmount.
 */
export default function HeroScene({ variant = "full" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const disposables: Array<THREE.BufferGeometry | THREE.Material | THREE.Texture> = [];

    // ─────────────────────────────────────────
    // STAR FIELD
    // ─────────────────────────────────────────
    const COUNT = variant === "full" ? 800 : 450;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const palette = [
      new THREE.Color("#A78BFA"),
      new THREE.Color("#C4B5FD"),
      new THREE.Color("#FFFFFF"),
    ];

    for (let i = 0; i < COUNT; i++) {
      // random point in sphere of radius 400 (cube-root keeps density uniform)
      const r = Math.cbrt(Math.random()) * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: variant === "full" ? 1.6 : 1.3,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);
    disposables.push(geo, mat);

    // ─────────────────────────────────────────
    // ANIMATION LOOP
    // ─────────────────────────────────────────
    let rafId = 0;
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;

      if (!prefersReduced) {
        particles.rotation.y += 0.0003;
        particles.rotation.x = Math.sin(t * 0.1) * 0.05;
        mat.opacity = 0.6 + Math.sin(t * 0.6) * 0.12;
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ─────────────────────────────────────────
    // RESIZE
    // ─────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ─────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
