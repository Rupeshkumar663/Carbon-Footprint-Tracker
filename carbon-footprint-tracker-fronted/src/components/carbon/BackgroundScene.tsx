import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function BackgroundScene() {
  return (
   <Canvas className="fixed inset-0 w-full h-full -z-10" camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.5} />
      <Stars radius={50} depth={40} count={800} factor={2} fade/>
    </Canvas>
  );
}