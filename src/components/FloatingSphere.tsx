import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface FloatingSphereProps {
  position: [number, number, number]
  scrollY: number
  speed?: number
}

export function FloatingSphere({ position, scrollY, speed = 0.3 }: FloatingSphereProps) {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed
      meshRef.current.rotation.z += 0.005 * speed
      meshRef.current.position.y = position[1] + Math.cos(scrollY * 0.001) * 0.4
      meshRef.current.position.x = position[0] + Math.sin(scrollY * 0.0015) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial 
        color="#4f5f6e" 
        emissive="#4f5f6e"
        emissiveIntensity={0.15}
        wireframe
        opacity={0.25}
        transparent
      />
    </mesh>
  )
}

