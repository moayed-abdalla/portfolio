import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { FloatingCube } from './FloatingCube'
import { FloatingSphere } from './FloatingSphere'

interface Scene3DProps {
  scrollY: number
  mousePosition: { x: number; y: number }
}

export function Scene3D({ scrollY, mousePosition }: Scene3DProps) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
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

