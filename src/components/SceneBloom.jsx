import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function SceneBloom() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.42}
        luminanceThreshold={0.28}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
    </EffectComposer>
  );
}
