"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// ============================================================================
// ⚙️ CONFIGURATION — HAR CHEEZ KA CONTROL YAHIN SE HAI
// ============================================================================
const CONFIG = {
  orbits: [
    { radius: 23, speed: 0.25, angle: 0, color: 0xc6ff00, thickness: 0.12, opacity: 0.55, tiltX: 1, tiltY: 0, tiltZ: 0 }, //green
    { radius: 23, speed: -0.18, angle: 0, color: 0x38bdf8, thickness: 0.12, opacity: 0.55, tiltX: 0, tiltY: 1, tiltZ: 0 }, // blue
    { radius: 23, speed: 0.12, angle: 0, color: 0xa855f7, thickness: 0.12, opacity: 0.55, tiltX: 0, tiltY: 0, tiltZ: 1 }, //purple
  ],

  planets: [
    { name: "Next.js", orbitIndex: 0, angleOffset: 0, color: 0xffffff, width: 5, height: 2.5, speedScale: 1 },
    { name: "React", orbitIndex: 0, angleOffset: Math.PI, color: 0x61dafb, width: 5, height: 2.5, speedScale: 1 },
    { name: "TypeScript", orbitIndex: 1, angleOffset: Math.PI / 2, color: 0x3178c6, width: 5, height: 2.5, speedScale: 1 },
    { name: "Tailwind", orbitIndex: 1, angleOffset: (Math.PI * 3) / 2, color: 0x06b6d4, width: 5, height: 2.5, speedScale: 1 },
    { name: "Three.js", orbitIndex: 2, angleOffset: Math.PI / 4, color: 0xffffff, width: 5, height: 2.5, speedScale: 1 },
    { name: "Node.js", orbitIndex: 2, angleOffset: (Math.PI * 5) / 4, color: 0x5fa04e, width: 5, height: 2.5, speedScale: 1 },
  ],

  planetLabel: {
    canvasWidth: 256,
    canvasHeight: 128,
    fontSize: 32,
    textColor: "#ffffff",
    backgroundColor: "rgba(10, 10, 10, 0.85)",
    borderWidth: 4,
    cornerRadius: 20,
    bobAmount: 1.2,
    bobSpeed: 1,
  },

  // Orbit System X, Y, Z Center Controls
  planetarySystem: {
    centerOffsetX: -1,
    centerOffsetY: 3,
    centerOffsetZ: 5,
  },

  laptop: {
    aluminumColor: 0x8f9299,
    darkPlasticColor: 0x0a0a0b,
    logoColor: 0xffffff,
    cameraColor: 0x222222,
    metalness: 0.85,
    roughness: 0.38,
    envMapIntensity: 1.1,
    darkPlasticMetalness: 0.25,
    darkPlasticRoughness: 0.55,
    darkPlasticEnvMapIntensity: 0.7,

    // Position Controls (X, Y, Z)
    positionX: 0,         // Horizontal position (Left/Right)
    positionZ: 0,         // Depth position (Forward/Backward)
    startY: -50,          // Entry start height
    entranceFromY: -40,   // Entry start point
    entranceToY: 0,       // Final Y height (Center = 0)

    entranceDuration: 1.8,
    floatAmount: 0.4,
    floatSpeed: 1,
    baseRotationY: -Math.PI * 0,
    swayAmount: 0.05,
    swaySpeed: 0.3,
    tiltX: 0.4,
    tiltY: -0.05,
    tiltZ: 0,
    lidOpenDelay: 0.4,
    lidOpenDuration: 1.5,
    lidClosedAngle: Math.PI * 0.5,
    lidOpenAngle: -Math.PI * 0.1,
    screenFadeStart: 0.4,
    screenMaxOpacity: 0.96,
    displayLightIntensity: 1.8,
    displayLightDistance: 35,
    displayLightColor: 0xc6ff00,
  },

  camera: {
    fov: 40,
    positionX: 0,
    positionY: 10,
    positionZ: 75,
    near: 0.1,
    far: 1000,
  },

  controls: {
    enableRotate: true,
    enableZoom: false,
    enablePan: false,
    rotateSpeed: 0.5,
    dampingFactor: 0.05,
    minDistance: 50,
    maxDistance: 110,
  },

  lights: {
    environmentIntensity: 0.85,
    ambientColor: 0xffffff,
    ambientIntensity: 0.4,
    sunColor: 0xc6ff00,
    sunIntensity: 3,
    sunDistance: 70,
    sunPositionX: 0,
    sunPositionY: 5,
    sunPositionZ: 0,
    fillColor: 0xffffff,
    fillIntensity: 0.8,
    fillPositionX: 25,
    fillPositionY: 20,
    fillPositionZ: 25,
  },

  renderer: {
    toneMappingExposure: 1.15,
    maxPixelRatio: 2,
  },

  particles: {
    count: 180,
    color: 0xc6ff00,
    size: 0.6,
    opacity: 0.8,
    spreadX: 120,
    spreadY: 80,
    spreadZ: 80,
    rotationSpeed: 0.08,
  },
};

export default function LaptopOrbitScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let animationId = 0;
    let modelLoaded = false;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      CONFIG.camera.fov,
      mount.clientWidth / mount.clientHeight,
      CONFIG.camera.near,
      CONFIG.camera.far
    );
    camera.position.set(
      CONFIG.camera.positionX,
      CONFIG.camera.positionY,
      CONFIG.camera.positionZ
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, CONFIG.renderer.maxPixelRatio)
    );
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = CONFIG.renderer.toneMappingExposure;

    mount.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environmentTexture = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    scene.environment = environmentTexture;
    scene.environmentIntensity = CONFIG.lights.environmentIntensity;

    scene.add(
      new THREE.AmbientLight(
        CONFIG.lights.ambientColor,
        CONFIG.lights.ambientIntensity
      )
    );

    const sunLight = new THREE.PointLight(
      CONFIG.lights.sunColor,
      CONFIG.lights.sunIntensity,
      CONFIG.lights.sunDistance
    );
    sunLight.position.set(
      CONFIG.lights.sunPositionX,
      CONFIG.lights.sunPositionY,
      CONFIG.lights.sunPositionZ
    );
    scene.add(sunLight);

    const fillLight = new THREE.PointLight(
      CONFIG.lights.fillColor,
      CONFIG.lights.fillIntensity
    );
    fillLight.position.set(
      CONFIG.lights.fillPositionX,
      CONFIG.lights.fillPositionY,
      CONFIG.lights.fillPositionZ
    );
    scene.add(fillLight);

    // Laptop Group Position (X, StartY, Z)
    const macGroup = new THREE.Group();
    macGroup.position.set(CONFIG.laptop.positionX, CONFIG.laptop.startY, CONFIG.laptop.positionZ);
    scene.add(macGroup);

    const lidGroup = new THREE.Group();
    const bottomGroup = new THREE.Group();
    macGroup.add(lidGroup);
    macGroup.add(bottomGroup);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = CONFIG.controls.dampingFactor;
    controls.enableRotate = CONFIG.controls.enableRotate;
    controls.enableZoom = CONFIG.controls.enableZoom;
    controls.enablePan = CONFIG.controls.enablePan;
    controls.minDistance = CONFIG.controls.minDistance;
    controls.maxDistance = CONFIG.controls.maxDistance;
    controls.rotateSpeed = CONFIG.controls.rotateSpeed;

    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: CONFIG.laptop.aluminumColor,
      metalness: CONFIG.laptop.metalness,
      roughness: CONFIG.laptop.roughness,
      envMapIntensity: CONFIG.laptop.envMapIntensity,
    });

    const darkPlasticMaterial = new THREE.MeshStandardMaterial({
      color: CONFIG.laptop.darkPlasticColor,
      metalness: CONFIG.laptop.darkPlasticMetalness,
      roughness: CONFIG.laptop.darkPlasticRoughness,
      envMapIntensity: CONFIG.laptop.darkPlasticEnvMapIntensity,
    });

    const logoMaterial = new THREE.MeshBasicMaterial({
      color: CONFIG.laptop.logoColor,
    });
    const cameraMaterial = new THREE.MeshBasicMaterial({
      color: CONFIG.laptop.cameraColor,
    });

    const screenSize = [29.4, 20];
    const textureLoader = new THREE.TextureLoader();

    const screenTexture = textureLoader.load(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1N5WtwLC8FNamx_p71PZ4_ZMc82TJcRLXNatUOA9isg&s=10",
      (texture) => {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.y =
          (texture.image.width / texture.image.height / screenSize[0]) *
          screenSize[1];
        texture.needsUpdate = true;
      }
    );

    const keyboardTexture = textureLoader.load(
      "https://ksenia-k.com/img/threejs/keyboard-overlay.png"
    );

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
      toneMapped: false,
    });

    const keyboardMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      alphaMap: keyboardTexture,
      transparent: true,
    });

    // Planetary System Group Position (X, Y, Z)
    const planetarySystemGroup = new THREE.Group();
    planetarySystemGroup.position.set(
      CONFIG.laptop.positionX + CONFIG.planetarySystem.centerOffsetX,
      CONFIG.laptop.startY + CONFIG.planetarySystem.centerOffsetY,
      CONFIG.laptop.positionZ + CONFIG.planetarySystem.centerOffsetZ
    );
    scene.add(planetarySystemGroup);

    const orbitRings: THREE.Mesh[] = [];
    const orbitGroups: THREE.Group[] = [];
    CONFIG.orbits.forEach((orbitData) => {
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.set(orbitData.tiltX, orbitData.tiltY, orbitData.tiltZ);
      planetarySystemGroup.add(orbitGroup);
      orbitGroups.push(orbitGroup);

      const ringGeo = new THREE.TorusGeometry(
        orbitData.radius,
        orbitData.thickness,
        16,
        120
      );
      const ringMat = new THREE.MeshBasicMaterial({
        color: orbitData.color,
        transparent: true,
        opacity: orbitData.opacity,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      orbitGroup.add(ring);
      orbitRings.push(ring);
    });

    const planetMeshes: { mesh: THREE.Mesh; orbitIndex: number; speed: number; angle: number; radius: number }[] = [];

    CONFIG.planets.forEach((planet) => {
      const orbitData = CONFIG.orbits[planet.orbitIndex];

      const canvas = document.createElement("canvas");
      canvas.width = CONFIG.planetLabel.canvasWidth;
      canvas.height = CONFIG.planetLabel.canvasHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const w = CONFIG.planetLabel.canvasWidth;
        const h = CONFIG.planetLabel.canvasHeight;
        ctx.fillStyle = CONFIG.planetLabel.backgroundColor;
        ctx.beginPath();
        ctx.roundRect(
          10,
          10,
          w - 20,
          h - 20,
          CONFIG.planetLabel.cornerRadius
        );
        ctx.fill();
        ctx.lineWidth = CONFIG.planetLabel.borderWidth;
        ctx.strokeStyle = `#${planet.color.toString(16).padStart(6, "0")}`;
        ctx.stroke();

        ctx.fillStyle = CONFIG.planetLabel.textColor;
        ctx.font = `bold ${CONFIG.planetLabel.fontSize}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(planet.name, w / 2, h / 2);
      }

      const planetTexture = new THREE.CanvasTexture(canvas);
      planetTexture.colorSpace = THREE.SRGBColorSpace;

      const planetGeo = new THREE.PlaneGeometry(planet.width, planet.height);
      const planetMat = new THREE.MeshBasicMaterial({
        map: planetTexture,
        transparent: true,
        side: THREE.DoubleSide,
      });

      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      orbitGroups[planet.orbitIndex].add(planetMesh);

      planetMeshes.push({
        mesh: planetMesh,
        orbitIndex: planet.orbitIndex,
        speed: orbitData.speed * planet.speedScale,
        angle: planet.angleOffset + orbitData.angle,
        radius: orbitData.radius,
      });
    });

    const particlePositions = new Float32Array(CONFIG.particles.count * 3);
    for (let i = 0; i < CONFIG.particles.count * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * CONFIG.particles.spreadX;
      particlePositions[i + 1] =
        (Math.random() - 0.5) * CONFIG.particles.spreadY;
      particlePositions[i + 2] =
        (Math.random() - 0.5) * CONFIG.particles.spreadZ;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: CONFIG.particles.color,
      size: CONFIG.particles.size,
      transparent: true,
      opacity: CONFIG.particles.opacity,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    function parseModel(glb: { scene: THREE.Group }) {
      glb.scene.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;

        if (child.parent?.name === "_top") {
          if (child.name === "lid") child.material = aluminumMaterial;
          else if (child.name === "logo") child.material = logoMaterial;
          else if (child.name === "screen-frame") child.material = darkPlasticMaterial;
          else if (child.name === "camera") child.material = cameraMaterial;
        }

        if (child.parent?.name === "_bottom") {
          if (child.name === "base") child.material = aluminumMaterial;
          else if (["legs", "keyboard", "inner"].includes(child.name)) {
            child.material = darkPlasticMaterial;
          }
        }
      });
    }

    let displayLight: THREE.PointLight | null = null;

    function addLaptopParts() {
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(screenSize[0], screenSize[1]),
        screenMaterial
      );
      screen.position.set(0, 10.5, -0.11);
      screen.rotation.set(Math.PI, 0, 0);
      lidGroup.add(screen);

      displayLight = new THREE.PointLight(
        CONFIG.laptop.displayLightColor,
        0,
        CONFIG.laptop.displayLightDistance
      );
      displayLight.position.set(0, 10.5, 2);
      lidGroup.add(displayLight);

      const keyboard = new THREE.Mesh(
        new THREE.PlaneGeometry(27.7, 11.6),
        keyboardMaterial
      );
      keyboard.rotation.set(-Math.PI * 0.5, 0, 0);
      keyboard.position.set(0, 0.045, 7.21);
      bottomGroup.add(keyboard);
    }

    const loader = new GLTFLoader();
    loader.load(
      "https://ksenia-k.com/models/mac-noUv.glb",
      (glb) => {
        if (disposed) return;
        const topObj = glb.scene.getObjectByName("_top");
        const bottomObj = glb.scene.getObjectByName("_bottom");

        parseModel(glb);

        if (topObj) lidGroup.add(topObj);
        if (bottomObj) bottomGroup.add(bottomObj);

        addLaptopParts();
        modelLoaded = true;
      },
      undefined,
      (error) => console.error("Model load error:", error)
    );

    const clock = new THREE.Clock();
    let elapsed = 0;
    let screenOpacity = 0;
    const parentWorldQuat = new THREE.Quaternion();

    const animate = () => {
      if (disposed) return;
      animationId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      elapsed += delta;

      if (modelLoaded) {
        const entrance = THREE.MathUtils.clamp(
          elapsed / CONFIG.laptop.entranceDuration,
          0,
          1
        );
        const ease = 1 - Math.pow(1 - entrance, 3);

        macGroup.position.y =
          THREE.MathUtils.lerp(
            CONFIG.laptop.entranceFromY,
            CONFIG.laptop.entranceToY,
            ease
          ) +
          Math.sin(elapsed * CONFIG.laptop.floatSpeed) *
            CONFIG.laptop.floatAmount *
            ease;

        macGroup.rotation.y =
          CONFIG.laptop.baseRotationY +
          Math.sin(elapsed * CONFIG.laptop.swaySpeed) *
            CONFIG.laptop.swayAmount;
        macGroup.rotation.x = CONFIG.laptop.tiltX;
        macGroup.rotation.y = CONFIG.laptop.tiltY;
        macGroup.rotation.z = CONFIG.laptop.tiltZ;

        const openProgress = THREE.MathUtils.clamp(
          (elapsed - CONFIG.laptop.lidOpenDelay) /
            CONFIG.laptop.lidOpenDuration,
          0,
          1
        );
        const openEase = openProgress * openProgress * (3 - 2 * openProgress);
        lidGroup.rotation.x = THREE.MathUtils.lerp(
          CONFIG.laptop.lidClosedAngle,
          CONFIG.laptop.lidOpenAngle,
          openEase
        );

        const targetOpacity =
          openProgress > CONFIG.laptop.screenFadeStart
            ? CONFIG.laptop.screenMaxOpacity
            : 0;
        screenOpacity = THREE.MathUtils.lerp(screenOpacity, targetOpacity, delta * 3);
        screenMaterial.opacity = screenOpacity;

        if (displayLight) {
          displayLight.intensity =
            screenOpacity * CONFIG.laptop.displayLightIntensity;
        }
      }

      // Sync Planetary System with Laptop X, Y, Z positions
      planetarySystemGroup.position.x = CONFIG.laptop.positionX + CONFIG.planetarySystem.centerOffsetX;
      planetarySystemGroup.position.y = macGroup.position.y + CONFIG.planetarySystem.centerOffsetY;
      planetarySystemGroup.position.z = CONFIG.laptop.positionZ + CONFIG.planetarySystem.centerOffsetZ;

      planetMeshes.forEach((p) => {
        p.angle += p.speed * delta;
        p.mesh.position.x = Math.cos(p.angle) * p.radius;
        p.mesh.position.z = Math.sin(p.angle) * p.radius;
        p.mesh.position.y =
          Math.sin(elapsed * CONFIG.planetLabel.bobSpeed + p.angle) *
          CONFIG.planetLabel.bobAmount;

        if (p.mesh.parent) {
          p.mesh.parent.getWorldQuaternion(parentWorldQuat);
          p.mesh.quaternion.copy(
            parentWorldQuat.invert().multiply(camera.quaternion)
          );
        }
      });

      particles.rotation.y = elapsed * CONFIG.particles.rotationSpeed;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        if (!width || !height) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });

    resizeObserver.observe(mount);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      controls.dispose();
      environmentTexture.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative h-[380px] w-full cursor-grab active:cursor-grabbing sm:h-[460px] lg:h-[540px]"
      aria-hidden="true"
    />
  );
}
