import { Float } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three"
import { MovingShapeProps } from "../../types/carbonTypes"
export default function MovingShape({position,type}:MovingShapeProps){
const ref=useRef<Mesh | null>(null)
useFrame((state)=>{
 if(!ref.current) 
    return
   ref.current.rotation.x +=0.0015
   ref.current.rotation.y +=0.0015
   ref.current.position.x=position[0]+state.mouse.x * 0.8
   ref.current.position.y=position[1]+state.mouse.y * 0.8
 })

let geometry
 if(type==="cube"){
   geometry=<boxGeometry args={[0.6,0.6,0.6]} />
  }
 else if(type==="torus"){
   geometry=<torusGeometry args={[0.5,0.15,12,50]} />
 }
 else{
  geometry=<sphereGeometry args={[0.5,24,24]} />
 }
return(
  <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
   <mesh ref={ref} position={position}>
    {geometry}
    <meshStandardMaterial color="#22c55e" emissive="#22c55e"/>
   </mesh>
  </Float>
  )
 }