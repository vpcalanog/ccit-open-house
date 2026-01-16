import { Canvas } from '@react-three/fiber'

export default function Scene({ children, onCanvasClick }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      onPointerDown={onCanvasClick}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      {children}
    </Canvas>
  )
}