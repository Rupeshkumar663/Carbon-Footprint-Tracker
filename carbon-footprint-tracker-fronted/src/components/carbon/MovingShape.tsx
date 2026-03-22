import { Float } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three"
import { MovingShapeProps } from "../../types/carbonTypes"
export default function MovingShape({position,type}:MovingShapeProps){
const ref=useRef<Mesh>(null!)
useFrame((state)=>{
 if(!ref.current) 
    return
   ref.current.rotation.x +=0.002
   ref.current.rotation.y +=0.002
   ref.current.position.x=position[0]+state.mouse.x * 1.5
   ref.current.position.y=position[1]+state.mouse.y * 1.5
 })

let geometry
 if(type==="cube"){
   geometry=<boxGeometry args={[0.6,0.6,0.6]} />
  }
 else if(type==="torus"){
   geometry=<torusGeometry args={[0.5,0.15,16,100]} />
 }
 else{
  geometry=<sphereGeometry args={[0.5,32,32]} />
 }
return(
  <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
   <mesh ref={ref} position={position}>
    {geometry}
    <meshStandardMaterial color="#22c55e" emissive="#22c55e"/>
   </mesh>
  </Float>
  )
 }