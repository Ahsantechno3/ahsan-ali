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
    // glowOpacity: line ke gird glow/shadow ki taqat
    { radius: 2.55, tube: 0.022, color: 0xc6ff00, tiltX: 1.22, tiltZ: -0.16, glowOpacity: 0.1 },
    { radius: 2.3, tube: 0.018, color: 0xc6ff00, tiltX: 0.88, tiltZ: 0.24, glowOpacity: 0.08 },
  ],
  ringGroupY: -0.55, // rings waist ki height par
  rotateSpeed: 0.25, // poora group kitni ahista ghoomta hai (rad/s)
  camera: { fov: 35, z: 11 },
};

/**
 * Ahsan ki photo ek Three.js plane par, aur asal 3D rings us ke gird —
 * har ring ka ek hissa photo ke AAGAY aur dosra hissa PEECHAY se guzarta
 * hai (alphaTest photo ke transparent hisse ko depth se kaat deta hai,
 * is liye peeche wali line khaali jagah par nazar aati hai aur body ke
 * peeche chhup jati hai). Lines par koi dots nahi hain; har line ke gird
 * ek soft glow layer hai jo use shadow/depth deta hai.
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
    ringGroup.position.y = CONFIG.ringGroupY;
    scene.add(ringGroup);

    for (const r of CONFIG.rings) {
      const pivot = new THREE.Group();
      pivot.rotation.set(r.tiltX, 0, r.tiltZ);
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
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      // sirf rings ghoomti hain — photo bilkul still hai
      ringGroup.rotation.y = t * CONFIG.rotateSpeed;
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
