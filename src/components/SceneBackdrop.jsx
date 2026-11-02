/**
 * One WebGL plane behind the page. Depth maps shift the figure toward
 * the pointer so the photos feel dimensional without covering the type.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SCENES } from "../data/content";
import { usePageVisible } from "../hooks/usePageVisible";

const VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;
  uniform sampler2D colorA;
  uniform sampler2D depthA;
  uniform sampler2D colorB;
  uniform sampler2D depthB;
  uniform vec2 imageSizeA;
  uniform vec2 imageSizeB;
  uniform vec2 viewSize;
  uniform vec2 focusA;
  uniform vec2 focusB;
  uniform vec2 offset;
  uniform float mixValue;
  uniform float strength;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 imageSize, vec2 focus) {
    float imageAspect = imageSize.x / max(imageSize.y, 1.0);
    float viewAspect = viewSize.x / max(viewSize.y, 1.0);
    vec2 scale = viewAspect > imageAspect
      ? vec2(1.0, imageAspect / viewAspect)
      : vec2(viewAspect / imageAspect, 1.0);
    vec2 shift = (vec2(1.0) - scale) * (focus - 0.5);
    return clamp((uv - 0.5) * scale + 0.5 + shift, 0.002, 0.998);
  }

  vec4 sampleScene(sampler2D colorMap, sampler2D depthMap, vec2 imageSize, vec2 focus) {
    vec2 mapped = coverUv(vUv, imageSize, focus);
    float depth = texture2D(depthMap, mapped).r;
    vec2 displaced = mapped + offset * (depth - 0.42) * strength;
    return texture2D(colorMap, clamp(displaced, 0.002, 0.998));
  }

  void main() {
    vec4 from = sampleScene(colorA, depthA, imageSizeA, focusA);
    vec4 to = sampleScene(colorB, depthB, imageSizeB, focusB);
    gl_FragColor = mix(from, to, mixValue);
  }
`;

function sceneUrl(fileName) {
  return `${import.meta.env.BASE_URL}scenes/${fileName}`;
}

function depthUrl(image) {
  return sceneUrl(image.replace(/\.webp$/i, "-depth.png"));
}

function loadTexture(loader, url) {
  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });
}

export default function SceneBackdrop({ activeScene }) {
  const canvasRef = useRef(null);
  const activeRef = useRef(activeScene);
  const visible = usePageVisible();
  const visibleRef = useRef(visible);
  activeRef.current = activeScene;
  visibleRef.current = visible;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return undefined;
    }

    renderer.setClearColor(0x070b14, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    const camera = new THREE.Camera();
    const scene = new THREE.Scene();
    const loader = new THREE.TextureLoader();
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const fade = { value: 0, from: 0, to: 0 };
    fade.from = Math.max(0, activeRef.current - 1);
    fade.to = fade.from;

    const uniforms = {
      colorA: { value: null },
      depthA: { value: null },
      colorB: { value: null },
      depthB: { value: null },
      imageSizeA: { value: new THREE.Vector2(1920, 1080) },
      imageSizeB: { value: new THREE.Vector2(1920, 1080) },
      viewSize: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      focusA: { value: new THREE.Vector2(0.5, 0.5) },
      focusB: { value: new THREE.Vector2(0.5, 0.5) },
      offset: { value: new THREE.Vector2(0, 0) },
      mixValue: { value: 0 },
      strength: { value: 0.028 },
    };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        depthTest: false,
      })
    );
    scene.add(mesh);

    const pack = SCENES.map((item) => ({
      focus: item.figureTarget,
      color: null,
      depth: null,
    }));

    let frame = 0;
    let disposed = false;
    const finePointer = window.matchMedia("(pointer: fine)");

    const bindScene = (slot, index) => {
      const item = pack[index];
      if (!item?.color) return;
      uniforms[slot === "A" ? "colorA" : "colorB"].value = item.color;
      uniforms[slot === "A" ? "depthA" : "depthB"].value = item.depth;
      uniforms[slot === "A" ? "imageSizeA" : "imageSizeB"].value.set(
        item.color.image.width,
        item.color.image.height
      );
      uniforms[slot === "A" ? "focusA" : "focusB"].value.set(item.focus[0], 1 - item.focus[1]);
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      uniforms.viewSize.value.set(width, height);
    };

    const onPointer = (event) => {
      if (!finePointer.matches) return;
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const render = (time) => {
      if (disposed) return;
      frame = requestAnimationFrame(render);
      if (!visibleRef.current) return;

      const nextIndex = Math.max(0, Math.min(pack.length - 1, activeRef.current - 1));
      if (nextIndex !== fade.to && pack[nextIndex]?.color) {
        fade.from = fade.to;
        fade.to = nextIndex;
        fade.value = 0;
        bindScene("A", fade.from);
        bindScene("B", fade.to);
      }

      fade.value = Math.min(1, fade.value + 0.018);
      uniforms.mixValue.value = fade.value;

      mouse.x += (target.x - mouse.x) * 0.045;
      mouse.y += (target.y - mouse.y) * 0.045;
      const driftX = Math.sin(time * 0.00018) * 0.18;
      const driftY = Math.cos(time * 0.00014) * 0.12;
      uniforms.offset.value.set(mouse.x * 0.55 + driftX, -mouse.y * 0.4 + driftY);

      renderer.render(scene, camera);
    };

    const ready = Promise.all(
      SCENES.map(async (item, index) => {
        const [color, depth] = await Promise.all([
          loadTexture(loader, sceneUrl(item.image)),
          loadTexture(loader, depthUrl(item.image)),
        ]);
        color.colorSpace = THREE.SRGBColorSpace;
        color.minFilter = THREE.LinearFilter;
        depth.minFilter = THREE.LinearFilter;
        pack[index].color = color;
        pack[index].depth = depth;
      })
    );

    ready.then(() => {
      if (disposed) return;
      bindScene("A", fade.from);
      bindScene("B", fade.to);
      document.body.classList.add("has-scene-3d");
      resize();
      frame = requestAnimationFrame(render);
    }).catch(() => {
      document.body.classList.remove("has-scene-3d");
    });

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
      document.body.classList.remove("has-scene-3d");
      pack.forEach((item) => {
        item.color?.dispose();
        item.depth?.dispose();
      });
      mesh.geometry.dispose();
      mesh.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="scene-backdrop" aria-hidden="true" />;
}
