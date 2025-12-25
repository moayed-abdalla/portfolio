import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { FloatingCube } from './FloatingCube'
import { FloatingSphere } from './FloatingSphere'

interface Scene3DProps {
  scrollY: number
}

export function Scene3D({ scrollY }: Scene3DProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ 
        antialias: true, 
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance"
      }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0)
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      {/* Floating 3D objects */}
      <FloatingCube position={[-2, 1, -2]} scrollY={scrollY} speed={0.4} />
      <FloatingCube position={[2, -1, -1]} scrollY={scrollY} speed={0.6} />
      <FloatingCube position={[0, 2, -3]} scrollY={scrollY} speed={0.5} />
      <FloatingSphere position={[-1.5, -1.5, -2]} scrollY={scrollY} speed={0.4} />
      <FloatingSphere position={[1.5, 1, -1.5]} scrollY={scrollY} speed={0.5} />
      <FloatingSphere position={[-0.5, -2, -2.5]} scrollY={scrollY} speed={0.3} />
    </Canvas>
  )
}

