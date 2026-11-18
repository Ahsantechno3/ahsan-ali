"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Ambient Three.js backdrop for the hero: glowing orbit rings, a faint
 * wireframe icosahedron and drifting neon particles. The premium laptop
 * itself is a CSS/JSX visual (LaptopVisual) layered on top of this scene,
 * so the composition stays crisp at every size.
 */
export default function LaptopScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.6, 8);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const neon = new THREE.Color("#C6FF00");

    // Orbit rings at different tilts
    const rings: THREE.Mesh[] = [];
    const ringSpecs = [
      { radius: 3.1, tilt: Math.PI / 2.15, opacity: 0.8, speed: 0.22 },
      { radius: 3.7, tilt: Math.PI / 1.85, opacity: 0.4, speed: -0.16 },
      { radius: 2.55, tilt: Math.PI / 2.5, opacity: 0.3, speed: 0.3 },
    ];
    ringSpecs.forEach((spec) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(spec.radius, 0.014, 8, 140),
        new THREE.MeshBasicMaterial({
          color: neon,
          transparent: true,
          opacity: spec.opacity,
        })
      );
      ring.rotation.x = spec.tilt;
      ring.position.y = 0.1;
      rings.push(ring);
      scene.add(ring);
    });

    // Faint wireframe icosahedron behind the laptop
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.15, 1),
      new THREE.MeshBasicMaterial({
        color: neon,
        wireframe: true,
        transparent: true,
        opacity: 0.07,
      })
    );
    ico.position.y = 0.15;
    scene.add(ico);

    // Drifting particles
    const count = 190;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: neon,
        size: 0.05,
        transparent: true,
        opacity: 0.75,
      })
    );
    scene.add(particles);

    const clock = new THREE.Clock();
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      rings.forEach((ring, i) => {
        ring.rotation.z = t * ringSpecs[i].speed;
      });
      ico.rotation.y = t * 0.06;
      ico.rotation.x = Math.sin(t * 0.2) * 0.15;
      particles.rotation.y = t * 0.035;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      particleGeo.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
