import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Html,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";
import { PROJECTS, SKILL_LEVELS } from "../data/content";
import { usePageVisible } from "../hooks/usePageVisible";
import ProjectDetails from "./ProjectDetails";

const SceneBloom = lazy(() => import("./SceneBloom"));

const SECTION_IDS = ["hero", "about", "skills", "projects", "contact"];
const PROJECTS_FEATURED = PROJECTS.filter((project) => project.featured);

function getScrollState() {
  const sectionOffsets = SECTION_IDS.map((id) => {
    const section = document.getElementById(id);
    return section ? section.getBoundingClientRect().top + window.scrollY : 0;
  });

  return {
    scrollY: window.scrollY,
    sectionOffsets,
  };
}

function usePageScroll() {
  const scrollState = useRef({ scrollY: 0, sectionOffsets: [] });

  useEffect(() => {
    const update = () => {
      scrollState.current = getScrollState();
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  return scrollState;
}

function createNetworkPoints(count, radius) {
  return Array.from({ length: count }, (_, index) => {
    const phi = Math.acos(-1 + (2 * index) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    const distance = radius * (0.8 + ((index * 37) % 20) / 100);
    return new THREE.Vector3(
      distance * Math.cos(theta) * Math.sin(phi),
      distance * Math.sin(theta) * Math.sin(phi),
      distance * Math.cos(phi)
    );
  });
}

function createLinePairs(count, maxVertices) {
  const maxEdges = Math.floor(maxVertices / 2);
  const pairs = [];

  for (let offset = 1; offset <= 5 && pairs.length < maxEdges; offset += 1) {
    for (let index = 0; index < count && pairs.length < maxEdges; index += 1) {
      pairs.push([index, (index + offset) % count]);
    }
  }

  return pairs;
}

function getStage(scrollY, sectionOffsets) {
  // Scroll map: hero -> about -> skills -> projects -> contact.
  // Section offsets are anchors; normalized progress blends adjacent node layouts.
  let index = 0;
  while (index < sectionOffsets.length - 2 && scrollY >= sectionOffsets[index + 1]) {
    index += 1;
  }

  const start = sectionOffsets[index] || 0;
  const end = sectionOffsets[index + 1] || start + window.innerHeight;
  const progress = THREE.MathUtils.clamp((scrollY - start) / Math.max(end - start, 1), 0, 1);
  return { index, progress };
}

function buildStagePoints(networkPoints, stage, radius) {
  if (stage === 0) return networkPoints;

  if (stage === 1) {
    return networkPoints.map((_, index) => {
      const angle = (index / networkPoints.length) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(angle) * radius * 0.62,
        Math.sin(angle) * radius * 0.62,
        Math.sin(angle * 3) * radius * 0.055
      );
    });
  }

  if (stage === 2) {
    const clusterCenters = [
      new THREE.Vector3(-radius * 0.42, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(radius * 0.42, 0, 0),
    ];
    return networkPoints.map((_, index) => {
      const center = clusterCenters[index % SKILL_LEVELS.length];
      const ringIndex = Math.floor(index / SKILL_LEVELS.length);
      const angle = ringIndex * 2.399;
      const spread = 0.16 + (ringIndex % 5) * 0.035;
      return new THREE.Vector3(
        center.x + Math.cos(angle) * spread,
        center.y + Math.sin(angle) * spread,
        Math.sin(angle * 2) * spread * 0.4
      );
    });
  }

  if (stage === 3) {
    return networkPoints.map((_, index) => {
      const column = index % 12;
      const row = Math.floor(index / 12);
      return new THREE.Vector3(
        (column - 5.5) * 0.44,
        (row - 6) * 0.42,
        Math.sin(column * 0.8) * 0.3
      );
    });
  }

  return networkPoints.map(() => new THREE.Vector3(0, 0, 0));
}

function ProjectPanel({ project, index, position, onSelect, overlayRootRef, isVisible }) {
  const [hovered, setHovered] = useState(false);
  const imageStyle = project.image
    ? {
        backgroundImage: `linear-gradient(180deg, transparent, rgba(7, 9, 14, 0.9)), url("${project.image}")`,
      }
    : undefined;

  return (
    <Float
      speed={1.1 + (index % 2) * 0.25}
      rotationIntensity={0.06}
      floatIntensity={0.12}
      floatingRange={[-0.12, 0.12]}
    >
      <group position={position}>
        <Html
          transform
          center
          distanceFactor={5}
          portal={overlayRootRef}
          style={{ pointerEvents: "auto", display: isVisible ? "block" : "none" }}
        >
          <button
            type="button"
            className={`neural-project-card${hovered ? " is-hovered" : ""}`}
            style={{ "--project-accent": project.accent, ...imageStyle }}
            onClick={() => onSelect(project)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span className="neural-project-category">{project.category}</span>
            <span className="neural-project-title">{project.title}</span>
            <span className="neural-project-action">Open project details ↗</span>
          </button>
        </Html>
      </group>
    </Float>
  );
}

function ProjectGallery({ onSelect, isMobile, overlayRootRef }) {
  const [isVisible, setIsVisible] = useState(false);
  const positions = useMemo(() => {
    const columns = 3;
    const rows = Math.ceil(PROJECTS_FEATURED.length / columns);
    return PROJECTS_FEATURED.map((_, index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;
      const countInRow = Math.min(columns, PROJECTS_FEATURED.length - row * columns);
      return [
        (column - (countInRow - 1) / 2) * 1.65,
        ((rows - 1) / 2 - row) * (isMobile ? 4.8 : 3.6),
        0,
      ];
    });
  }, [isMobile]);

  useEffect(() => {
    const section = document.getElementById("projects");
    if (!section) return undefined;

    const updateVisibility = () => {
      const bounds = section.getBoundingClientRect();
      setIsVisible(
        window.innerWidth >= 1360 &&
        bounds.top < window.innerHeight &&
        bounds.bottom > 0
      );
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <group position={[6, 0, 0]} visible={isVisible}>
      {PROJECTS_FEATURED.map((project, index) => (
        <ProjectPanel
          key={project.title}
          project={project}
          index={index}
          position={positions[index]}
          onSelect={onSelect}
          overlayRootRef={overlayRootRef}
          isVisible={isVisible}
        />
      ))}
    </group>
  );
}

function PerformanceGuard({ mobile }) {
  const setDpr = useThree((state) => state.setDpr);

  return (
    <PerformanceMonitor
      onIncline={() => setDpr(mobile ? 1 : 1.5)}
      onDecline={() => setDpr(1)}
    />
  );
}

function StaticWebGLFallback({ onReady }) {
  useEffect(() => onReady(), [onReady]);
  return <div className="neural-static-fallback" aria-hidden="true" />;
}

function NeuralNetwork({ scrollState, mouse, palette, isMobile, onSelect, overlayRootRef }) {
  const groupRef = useRef(null);
  const nodesRef = useRef(null);
  const linesRef = useRef(null);
  const coreRef = useRef(null);
  const { camera } = useThree();
  const nodeCount = isMobile ? 90 : 180;
  const lineVertexLimit = isMobile ? 600 : 2000;
  const radius = isMobile ? 4.2 : 5.4;
  const networkPoints = useMemo(() => createNetworkPoints(nodeCount, radius), [nodeCount, radius]);
  const stages = useMemo(
    () => SECTION_IDS.map((_, index) => buildStagePoints(networkPoints, index, radius)),
    [networkPoints, radius]
  );
  const linePairs = useMemo(
    () => createLinePairs(nodeCount, lineVertexLimit),
    [lineVertexLimit, nodeCount]
  );
  const linePositions = useMemo(() => new Float32Array(linePairs.length * 6), [linePairs]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cameraPositions = useMemo(
    () => [
      new THREE.Vector3(0, 0, 19),
      new THREE.Vector3(0, 0, 17),
      new THREE.Vector3(0, 0, 18),
      new THREE.Vector3(0, 0, 17),
      new THREE.Vector3(0, 0, 13),
    ],
    []
  );
  const colors = useMemo(
    () => [palette.cyan, palette.violet, palette.emerald].map((value) => new THREE.Color(value)),
    [palette]
  );

  useEffect(() => {
    const mesh = nodesRef.current;
    if (!mesh) return;
    for (let index = 0; index < nodeCount; index += 1) {
      mesh.setColorAt(index, colors[index % colors.length]);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [colors, nodeCount]);

  useFrame(({ clock }, delta) => {
    const { scrollY, sectionOffsets } = scrollState.current;
    const { index, progress } = getStage(scrollY, sectionOffsets);
    const from = stages[Math.min(index, stages.length - 1)];
    const to = stages[Math.min(index + 1, stages.length - 1)];
    const elapsed = clock.getElapsedTime();

    if (nodesRef.current) {
      for (let node = 0; node < nodeCount; node += 1) {
        const x = THREE.MathUtils.lerp(from[node].x, to[node].x, progress);
        const y = THREE.MathUtils.lerp(from[node].y, to[node].y, progress);
        const z = THREE.MathUtils.lerp(from[node].z, to[node].z, progress);
        dummy.position.set(x, y, z);
        const pulse = 0.72 + Math.sin(elapsed * 1.4 + node * 0.17) * 0.12;
        const scale = THREE.MathUtils.lerp(pulse, 0.15, index === 4 ? 1 : 0);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(node, dummy.matrix);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }

    const positions = linesRef.current?.geometry.attributes.position;
    if (positions) {
      linePairs.forEach(([start, end], indexInPairs) => {
        const startX = THREE.MathUtils.lerp(from[start].x, to[start].x, progress);
        const startY = THREE.MathUtils.lerp(from[start].y, to[start].y, progress);
        const startZ = THREE.MathUtils.lerp(from[start].z, to[start].z, progress);
        const endX = THREE.MathUtils.lerp(from[end].x, to[end].x, progress);
        const endY = THREE.MathUtils.lerp(from[end].y, to[end].y, progress);
        const endZ = THREE.MathUtils.lerp(from[end].z, to[end].z, progress);
        positions.setXYZ(indexInPairs * 2, startX, startY, startZ);
        positions.setXYZ(indexInPairs * 2 + 1, endX, endY, endZ);
      });
      positions.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.035;
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        mouse.current.y * 0.12,
        2,
        delta
      );
      groupRef.current.rotation.y += (mouse.current.x - groupRef.current.rotation.y) * delta * 0.015;
    }

    if (coreRef.current) {
      const contactProgress = index === 4 ? progress : 0;
      const pulse = 0.65 + Math.sin(elapsed * 2.1) * 0.12;
      const scale = THREE.MathUtils.lerp(0.001, pulse, contactProgress);
      coreRef.current.scale.setScalar(scale);
      coreRef.current.material.opacity = contactProgress;
    }

    const cameraFrom = cameraPositions[Math.min(index, cameraPositions.length - 1)];
    const cameraTo = cameraPositions[Math.min(index + 1, cameraPositions.length - 1)];
    camera.position.lerpVectors(cameraFrom, cameraTo, progress);
    if (index === 3) camera.position.x += Math.sin(progress * Math.PI * 2) * 4;
    camera.position.x += mouse.current.x * 0.7;
    camera.position.y -= mouse.current.y * 0.45;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <fog attach="fog" args={["#07090e", 14, 42]} />
      <group ref={groupRef}>
        {/* Instancing: N transforms -> one draw call; scroll -> adjacent layouts -> lerped transforms. */}
        <instancedMesh ref={nodesRef} args={[null, null, nodeCount]} frustumCulled={false}>
          <icosahedronGeometry args={[0.14, 0]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.82}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </instancedMesh>
        <lineSegments ref={linesRef} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
              usage={THREE.DynamicDrawUsage}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={palette.cyan}
            transparent
            opacity={0.19}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </lineSegments>
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.62, 24, 24]} />
          <meshBasicMaterial
            color={palette.emerald}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
      <ProjectGallery
        onSelect={onSelect}
        isMobile={isMobile}
        overlayRootRef={overlayRootRef}
      />
    </>
  );
}

function AdaptiveScene({ scrollState, mouse, palette, mobile, onSelect, reducedMotion, overlayRootRef }) {
  return (
    <>
      <PerformanceGuard mobile={mobile} />
      <NeuralNetwork
        scrollState={scrollState}
        mouse={mouse}
        palette={palette}
        isMobile={mobile}
        onSelect={onSelect}
        overlayRootRef={overlayRootRef}
      />
      {!mobile && !reducedMotion && (
        <Suspense fallback={null}>
          <SceneBloom />
        </Suspense>
      )}
    </>
  );
}

export default function CanvasExperience({ onReady, reducedMotion }) {
  const isPageVisible = usePageVisible();
  const [selectedProject, setSelectedProject] = useState(null);
  const [hasOverlayRoot, setHasOverlayRoot] = useState(false);
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 768px)").matches);
  const mouse = useRef({ x: 0, y: 0 });
  const overlayRef = useRef(null);
  const scrollState = usePageScroll();
  const palette = useMemo(() => {
    const styles = getComputedStyle(document.documentElement);
    const readToken = (token, fallback) => styles.getPropertyValue(token).trim() || fallback;
    return {
      cyan: readToken("--accent-cyan", "#00f2fe"),
      violet: readToken("--accent-violet", "#8b5cf6"),
      emerald: readToken("--accent-emerald", "#10b981"),
    };
  }, []);
  const onCanvasCreated = useCallback(() => onReady(), [onReady]);
  const registerOverlayRoot = useCallback((element) => {
    overlayRef.current = element;
    setHasOverlayRoot(Boolean(element));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateMobile = (event) => setMobile(event.matches);
    mediaQuery.addEventListener("change", updateMobile);
    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const onPointerMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reducedMotion]);

  useEffect(() => () => {
    document.body.style.cursor = "";
  }, []);

  return (
    <>
      <div className="neural-canvas-layer">
        <Canvas
          dpr={mobile ? [1, 1] : [1, 1.5]}
          frameloop={isPageVisible ? "always" : "never"}
          camera={{ position: [0, 0, 19], fov: 44, near: 0.1, far: 70 }}
          gl={{
            alpha: true,
            antialias: !mobile,
            powerPreference: "low-power",
          }}
          fallback={<StaticWebGLFallback onReady={onCanvasCreated} />}
          onCreated={onCanvasCreated}
        >
          <AdaptiveScene
            scrollState={scrollState}
            mouse={mouse}
            palette={palette}
            mobile={mobile}
            onSelect={setSelectedProject}
            reducedMotion={reducedMotion}
            overlayRootRef={hasOverlayRoot ? overlayRef : null}
          />
        </Canvas>
      </div>
      <div ref={registerOverlayRoot} className="neural-html-layer" />
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
