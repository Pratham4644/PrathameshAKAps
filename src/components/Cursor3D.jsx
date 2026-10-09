import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Cursor3D() {
  const mountRef = useRef(null);
  const [hoverText, setHoverText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const hoverTextRef = useRef("");

  useEffect(() => {
    // Only run on fine pointer devices (desktops/laptops)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const container = mountRef.current;
    if (!container) return;

    // Three.js Scene Setup for 3D Floating Geometric Cursor
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Small, simple 3D cursor: core + ring + subtle wireframe
    const innerGeo = new THREE.IcosahedronGeometry(0.14, 0);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x00f2fe,
      emissive: 0x00a8ff,
      emissiveIntensity: 0.5,
      shininess: 80,
      transparent: true,
      opacity: 0.9,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);

    const outerGeo = new THREE.OctahedronGeometry(0.2, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);

    const ringGeo = new THREE.TorusGeometry(0.27, 0.012, 8, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.7,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;

    // 3D Group
    const cursor3DGroup = new THREE.Group();
    cursor3DGroup.add(innerMesh);
    cursor3DGroup.add(outerMesh);
    cursor3DGroup.add(ringMesh);
    scene.add(cursor3DGroup);

    // 3D Trailing Particle Sparks
    const particleCount = 6;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleAges = new Float32Array(particleCount);
    const particleHistory = [];

    const cyan = new THREE.Color("#00f2fe");
    const emerald = new THREE.Color("#00ff88");

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = 0;
      particlePositions[i * 3 + 1] = 0;
      particlePositions[i * 3 + 2] = 0;

      const col = i % 2 === 0 ? cyan : emerald;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
      particleAges[i] = 1;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3D Lighting
    const pointLight = new THREE.PointLight(0x00f2fe, 3, 40);
    pointLight.position.set(2, 4, 10);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Screen to 3D World conversion helper
    const toWorldCoords = (clientX, clientY) => {
      const vec = new THREE.Vector3();
      const pos = new THREE.Vector3();
      vec.set(
        (clientX / window.innerWidth) * 2 - 1,
        -(clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      const distance = -camera.position.z / vec.z;
      pos.copy(camera.position).add(vec.multiplyScalar(distance));
      return pos;
    };

    let targetWorldPos = new THREE.Vector3(0, 0, 0);
    let currentWorldPos = new THREE.Vector3(0, 0, 0);
    let velocity = new THREE.Vector2(0, 0);
    let lastMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMouseMove = (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      targetWorldPos = toWorldCoords(clientX, clientY);

      velocity.x = clientX - lastMouse.x;
      velocity.y = clientY - lastMouse.y;
      lastMouse = { x: clientX, y: clientY };

      // Emit trailing particle
      particleHistory.push({
        x: targetWorldPos.x,
        y: targetWorldPos.y,
        z: targetWorldPos.z,
        age: 0,
      });
      if (particleHistory.length > particleCount) particleHistory.shift();
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const clickable = target.closest(
        "a, button, input, textarea, select, .card-3d, .skill-tab-btn, .social-btn-3d, .tech-badge, .project-card-3d, .cert-card-3d"
      );

      if (clickable) {
        isHoveredRef.current = true;
        setIsHovered(true);

        if (clickable.tagName === "A" || clickable.classList.contains("btn-3d")) {
          hoverTextRef.current = "OPEN";
          setHoverText("OPEN");
        } else if (clickable.classList.contains("project-card-3d")) {
          hoverTextRef.current = "VIEW";
          setHoverText("VIEW");
        } else if (clickable.classList.contains("skill-tab-btn")) {
          hoverTextRef.current = "FILTER";
          setHoverText("FILTER");
        } else {
          hoverTextRef.current = "";
          setHoverText("");
        }
      } else {
        isHoveredRef.current = false;
        setIsHovered(false);
        hoverTextRef.current = "";
        setHoverText("");
      }
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("resize", onResize);

    // Animation Loop
    let reqId;
    let targetScale = 1;
    let currentScale = 1;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Smooth lerp for position (fast & responsive)
      currentWorldPos.lerp(targetWorldPos, 0.22);
      cursor3DGroup.position.copy(currentWorldPos);

      // 3D Velocity Tilt Physics
      const tiltX = Math.max(-0.6, Math.min(0.6, -velocity.y * 0.02));
      const tiltY = Math.max(-0.6, Math.min(0.6, velocity.x * 0.02));

      cursor3DGroup.rotation.x += (tiltX - cursor3DGroup.rotation.x) * 0.1;
      cursor3DGroup.rotation.y += (tiltY - cursor3DGroup.rotation.y) * 0.1;

      // Constant 3D self-rotation
      innerMesh.rotation.x += 0.02;
      innerMesh.rotation.y += 0.03;
      outerMesh.rotation.x -= 0.015;
      outerMesh.rotation.y -= 0.02;
      ringMesh.rotation.z += 0.025;

      // Scale up when hovering over interactive elements
      targetScale = isHoveredRef.current ? 1.15 : 0.8;
      currentScale += (targetScale - currentScale) * 0.15;
      cursor3DGroup.scale.set(currentScale, currentScale, currentScale);

      // Change emissive color on hover
      if (isHoveredRef.current) {
        innerMat.emissive.setHex(0x00ff88);
        innerMat.color.setHex(0x00ff88);
        outerMat.color.setHex(0x00f2fe);
      } else {
        innerMat.emissive.setHex(0x00a8ff);
        innerMat.color.setHex(0x00f2fe);
        outerMat.color.setHex(0x00ff88);
      }

      // Update trailing particles
      const posAttr = particleGeo.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        if (i < particleHistory.length) {
          const pt = particleHistory[i];
          pt.age += 0.04;
          posAttr.setXYZ(
            i,
            pt.x + (Math.random() - 0.5) * 0.1,
            pt.y + (Math.random() - 0.5) * 0.1,
            pt.z
          );
        } else {
          posAttr.setXYZ(i, currentWorldPos.x, currentWorldPos.y, currentWorldPos.z);
        }
      }
      posAttr.needsUpdate = true;

      // Decay velocity
      velocity.x *= 0.85;
      velocity.y *= 0.85;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="cursor-3d-wrapper">
      {/* Three.js 3D WebGL Floating Crystal Mesh Canvas */}
      <div ref={mountRef} className="cursor-3d-webgl" />

      {/* Floating Action Badge on Hover */}
      {isHovered && hoverText && (
        <div className="cursor-hover-pill">
          <span>{hoverText}</span>
        </div>
      )}
    </div>
  );
}
