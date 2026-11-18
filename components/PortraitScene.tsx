"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface RingCfg {
  radius: number;
  tube: number;
  color: number;
  tiltX: number;
  tiltZ: number;
  y: number;
  z: number;
  opacity: number;
  glowOpacity: number;
  /** Z transition: line ahista aagay/peeche drift hoti hai taake real lage. */
  zAnim?: { amp: number; speed: number };
}

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
    // FRONT line — banner wali diagonal swoosh: line waist ki height par
    // photo ko kaat-ti hui guzarti hai, is liye is ka chamakta hissa
    // body ke AAGAY se aur dosra hissa PEECHAY se guzarta hai — bilkul
    // sample banner ki tarah
    {
      radius: 2.05, tube: 0.024, color: 0xc6ff00,
      tiltX: 1.15, tiltZ: -0.55, y: -0.85, z: 0.35,
      opacity: 1, glowOpacity: 0.14,
    },
    // BACK line — poori ki poori photo ke peechay, halki si, aur Z mein
    // ahista transition (drift) taake flat na lage, real lage
    {
      radius: 2.3, tube: 0.018, color: 0xc6ff00,
      tiltX: 0.5, tiltZ: 0.25, y: 0.35, z: -1.675,
      opacity: 0.8, glowOpacity: 0.06,
      zAnim: { amp: 0.225, speed: 0.35 },
    },
  ] as RingCfg[],
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

    const ringItems: { pivot: THREE.Group; ring: RingCfg }[] = [];
    for (const r of CONFIG.rings) {
      const pivot = new THREE.Group();
      pivot.rotation.set(r.tiltX, 0, r.tiltZ);
      pivot.position.set(0, r.y, r.z);
      ringItems.push({ pivot, ring: r });
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
        new THREE.MeshBasicMaterial({
          color: r.color,
          transparent: r.opacity < 1,
          opacity: r.opacity,
        })
      );
      pivot.add(glow, core);
      ringGroup.add(pivot);
    }

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      // Back line ki Z transition: wo ahista depth mein drift hoti hai
      // (kabhi thori qareeb, kabhi thori door) — is se wo flat nahi
      // lagti, real 3D lagti hai. Front line aur photo still hain.
      for (const item of ringItems) {
        if (item.ring.zAnim) {
          item.pivot.position.z =
            item.ring.z + Math.sin(t * item.ring.zAnim.speed) * item.ring.zAnim.amp;
        }
      }
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
