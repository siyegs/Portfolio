import { useFrame } from "@react-three/fiber";
import {
  Preload,
  Float,
  Sphere,
  MeshDistortMaterial,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import * as THREE from "three";

interface SceneProps {
  hoveredName: string | null;
  theme: string;
}

interface BlobCfg {
  pos: [number, number, number];
  scale: number;
  light: string; // base tint in light (holographic) mode
  distort: number;
  speed: number;
}

// Glossy gradient blobs scattered around the edges, framing the centre.
const BLOBS: BlobCfg[] = [
  { pos: [-3.9, 1.5, -1.0], scale: 1.35, light: "#34d399", distort: 0.42, speed: 1.6 },
  { pos: [3.9, 1.1, -1.4], scale: 1.15, light: "#f472b6", distort: 0.46, speed: 1.9 },
  { pos: [-3.3, -1.9, -1.0], scale: 1.2, light: "#818cf8", distort: 0.38, speed: 1.4 },
  { pos: [3.5, -1.8, -1.2], scale: 1.3, light: "#fbbf24", distort: 0.44, speed: 1.7 },
  { pos: [0.4, 2.7, -2.4], scale: 0.85, light: "#22d3ee", distort: 0.5, speed: 2.1 },
  { pos: [-0.2, -2.8, -2.0], scale: 0.95, light: "#a78bfa", distort: 0.4, speed: 1.5 },
];

const DARK_BLOB = "#15171e";

const Blob = ({ cfg, isLight }: { cfg: BlobCfg; isLight: boolean }) => {
  return (
    <Float speed={cfg.speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <group position={cfg.pos} scale={cfg.scale}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            distort={cfg.distort}
            speed={cfg.speed}
            color={isLight ? cfg.light : DARK_BLOB}
            roughness={isLight ? 0.15 : 0.2}
            metalness={isLight ? 0.1 : 0.45}
            clearcoat={1}
            clearcoatRoughness={0.15}
            iridescence={isLight ? 1 : 0.25}
            iridescenceIOR={1.3}
            envMapIntensity={isLight ? 1.2 : 1.7}
          />
        </Sphere>
      </group>
    </Float>
  );
};

// Whole cluster drifts gently toward the cursor (parallax).
const ParallaxGroup = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      state.pointer.x * 0.6,
      0.03
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      state.pointer.y * 0.4,
      0.03
    );
  });
  return <group ref={ref}>{children}</group>;
};

const Scene = ({ theme }: SceneProps) => {
  const isLight = theme === "light";

  return (
    <>
      <ambientLight intensity={isLight ? 0.6 : 0.35} />
      <directionalLight position={[5, 6, 4]} intensity={isLight ? 1.0 : 0.8} />

      <Suspense fallback={null}>
        <ParallaxGroup>
          {BLOBS.map((cfg, i) => (
            <Blob key={i} cfg={cfg} isLight={isLight} />
          ))}
        </ParallaxGroup>

        {/* Colourful light-formers give the holographic speculars without an
            external HDR. Dimmer/whiter set for the dark-glossy mode. */}
        <Environment resolution={256}>
          {isLight ? (
            <>
              <Lightformer form="circle" intensity={2.2} color="#ff6ec7" position={[-3, 2, 2]} scale={4} />
              <Lightformer form="circle" intensity={2.2} color="#7afcff" position={[3, -2, 2]} scale={4} />
              <Lightformer form="circle" intensity={2.0} color="#ffd36e" position={[3, 2, -2]} scale={4} />
              <Lightformer form="circle" intensity={2.0} color="#a78bfa" position={[-3, -2, -2]} scale={4} />
              <Lightformer form="ring" intensity={1.6} color="#ffffff" position={[0, 0, 3]} scale={3} />
            </>
          ) : (
            <>
              <Lightformer form="rect" intensity={1.6} color="#ffffff" position={[0, 3, 2]} scale={[6, 2, 1]} />
              <Lightformer form="circle" intensity={1.4} color="#aab2d1" position={[-3, -1, 2]} scale={3} />
              <Lightformer form="circle" intensity={2.2} color="#ffffff" position={[3, 1, 1]} scale={2} />
            </>
          )}
        </Environment>

        <Preload all />
      </Suspense>

      <EffectComposer enableNormalPass={false}>
        <Bloom
          intensity={isLight ? 0.4 : 0.6}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
};

export default Scene;
