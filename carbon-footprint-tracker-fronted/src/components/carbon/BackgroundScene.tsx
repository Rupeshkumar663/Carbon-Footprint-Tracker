import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function BackgroundScene() {
  return (
    <Canvas className="fixed inset-0 w-full h-full -z-10" camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.3} />
      <Stars radius={60} depth={40} count={1500} factor={3} fade/>
    </Canvas>
  );
}