import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

/**
 * The fixed 3D backdrop, kept in its own module so it can be code-split.
 *
 * three, drei and postprocessing are about a megabyte of the bundle between
 * them. Importing them from App put that on the critical path of every visit,
 * including the phones that never render the scene at all. Loaded lazily, the
 * page paints first and the field arrives behind it.
 */
export default function BackgroundScene({
  theme,
  hoveredName,
}: {
  theme: string;
  hoveredName: string | null;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      performance={{ min: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <Scene hoveredName={hoveredName} theme={theme} />
    </Canvas>
  );
}
