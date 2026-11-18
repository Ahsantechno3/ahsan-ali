"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ============================================================================
// ⚙️ CONFIGURATION — portrait aur rings ka har control yahin se hai
// ============================================================================
const CONFIG = {
  portrait: {
    src: "/images/ahsan-portrait.png",
    width: 4.8, // plane width (photo ka aspect 1086x1448 ≈ 0.75)
    height: 6.4, // plane height
  },
  rings: [
    // radius: ring ka size · tube: line ki motai · tiltX/tiltZ: ring ka angle
    // y: line ki height · z: photo se faasla — har line ya to POORI aagay
    // hai ya POORI peechay (z ka faasla tilt ki z-range se zyada rakha
    // hai, is liye koi line aadhi aagay / aadhi peechay nahi hoti)
    // glowOpacity: line ke gird glow ki taqat
    { radius: 1.95, tube: 0.022, color: 0xc6ff00, tiltX: 0.9, tiltZ: -0.3, y: -0.55, z: 1.75, glowOpacity: 0.1 }, // front line
    { radius: 2.05, tube: 0.018, color: 0xc6ff00, tiltX: 0.55, tiltZ: 0.18, y: -0.1, z: -1.15, glowOpacity: 0.08 }, // back line
  ],
  camera: { fov: 35, z: 11 },
};

/**
 * Ahsan ki photo ek Three.js plane par, aur do asal 3D lines us ke gird,
 * sample banner ki tarah: ek line poori ki poori photo ke AAGAY (z > 0)
 * aur ek poori ki poori PEECHAY (z < 0 — alphaTest ki wajah se wo sirf
 * photo ke khaali kinaron par nazar aati hai, body ke peeche chhup jati
 * hai). Lines par koi dots nahi hain; har line ke gird ek soft glow
 * layer hai. Lines aur photo dono still hain.
 */
export default function PortraitScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CONFIG.camera.fov, 1, 0.1, 100);
    camera.position.set(0, 0, CONFIG.camera.z);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // --- portrait plane ---
    const texture = new THREE.TextureLoader().load(CONFIG.portrait.src);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    const portrait = new THREE.Mesh(
      new THREE.PlaneGeometry(CONFIG.portrait.width, CONFIG.portrait.height),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.4,
        side: THREE.DoubleSide,
      })
    );
    scene.add(portrait);

    // --- orbit rings (solid lines, no dots) ---
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    for (const r of CONFIG.rings) {
      const pivot = new THREE.Group();
      pivot.rotation.set(r.tiltX, 0, r.tiltZ);
      pivot.position.set(0, r.y, r.z);
      // glow/shadow layer — same ring, fatter and soft
      const glow = new THREE.Mesh(
        new THREE.TorusGeometry(r.radius, r.tube * 2.4, 16, 140),
        new THREE.MeshBasicMaterial({
          color: r.color,
          transparent: true,
          opacity: r.glowOpacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      // the line itself
      const core = new THREE.Mesh(
        new THREE.TorusGeometry(r.radius, r.tube, 16, 140),
        new THREE.MeshBasicMaterial({ color: r.color })
      );
      pivot.add(glow, core);
      ringGroup.add(pivot);
    }

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      // lines apni jagah par still hain (sample banner ki tarah) —
      // ek photo ke aagay, ek peechay. Photo par bhi koi animation nahi.
      renderer.render(scene, camera);
    };

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mat = obj.material as THREE.Material;
          mat.dispose();
        }
      });
      texture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
