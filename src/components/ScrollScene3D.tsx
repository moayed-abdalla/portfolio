import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { FloatingCube } from './FloatingCube'
import { FloatingSphere } from './FloatingSphere'

interface ScrollScene3DProps {
  scrollY: number
  sectionOffset: number
}

export function ScrollScene3D({ scrollY, sectionOffset }: ScrollScene3DProps) {
  const [isClient, setIsClient] = useState(false)
  const relativeScroll = scrollY - sectionOffset

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
      style={{ background: 'transparent' }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0)
      }}
      onError={(error) => {
        console.error('Canvas error:', error)
      }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} />
      
      {/* 3D objects that respond to scroll */}
      <FloatingCube position={[-1.5, 0, -1]} scrollY={relativeScroll} speed={0.5} />
      <FloatingCube position={[1.5, 0, -1.5]} scrollY={relativeScroll} speed={0.4} />
      <FloatingSphere position={[0, 0, -2]} scrollY={relativeScroll} speed={0.3} />
    </Canvas>
  )
}

