import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface FloatingCubeProps {
  position: [number, number, number]
  scrollY: number
  speed?: number
}

export function FloatingCube({ position, scrollY, speed = 0.5 }: FloatingCubeProps) {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.sin(scrollY * 0.001) * 0.5
      meshRef.current.position.x = position[0] + Math.cos(scrollY * 0.001) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial 
        color="#fae4c5" 
        emissive="#fae4c5"
        emissiveIntensity={0.2}
        wireframe
        opacity={0.3}
        transparent
      />
    </mesh>
  )
}

