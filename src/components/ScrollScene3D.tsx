import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { FloatingCube } from './FloatingCube'
import { FloatingSphere } from './FloatingSphere'

interface ScrollScene3DProps {
  scrollY: number
  sectionOffset: number
}

export function ScrollScene3D({ scrollY, sectionOffset }: ScrollScene3DProps) {
  const relativeScroll = scrollY - sectionOffset
  
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} />
      
      {/* 3D objects that respond to scroll */}
      <FloatingCube position={[-1.5, 0, -1]} scrollY={relativeScroll} speed={0.5} />
      <FloatingCube position={[1.5, 0, -1.5]} scrollY={relativeScroll} speed={0.4} />
      <FloatingSphere position={[0, 0, -2]} scrollY={relativeScroll} speed={0.3} />
    </Canvas>
  )
}

