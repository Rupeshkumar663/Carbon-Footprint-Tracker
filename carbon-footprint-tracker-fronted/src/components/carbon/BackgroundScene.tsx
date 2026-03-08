import { Canvas } from "@react-three/fiber"
import MovingShape from "./MovingShape"

export default function BackgroundScene(){

  return(
   <Canvas className="absolute top-0 left-0 w-full h-full -z-10" camera={{position:[0,0,8]}}>
    <ambientLight intensity={1}/>
    <pointLight position={[5,5,5]} color="#22c55e"/>
    <MovingShape type="sphere" position={[-4,2,-4]} />
    <MovingShape type="cube" position={[3,-1,-5]} />
    <MovingShape type="torus" position={[2,3,-6]} />
    <MovingShape type="sphere" position={[-3,-2,-5]} />
    <MovingShape type="cube" position={[4,1,-7]} /> 
   </Canvas>
  )
 }