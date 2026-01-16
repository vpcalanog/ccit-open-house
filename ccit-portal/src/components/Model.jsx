import { useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_MAP = {
  idle: '/models/orbit_idle.glb',
  bobbing: '/models/orbit_bobbing.glb'
}

export default function Model({ state }) {
  const group = useRef()
  const actionRef = useRef(null)

  const url = useMemo(() => {
    return MODEL_MAP[state] || MODEL_MAP.idle
  }, [state])

  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (!actions) return

    const action = Object.values(actions).reduce((longest, current) => {
      return current.getClip().duration > longest.getClip().duration ? current : longest
    }, Object.values(actions)[0])

    if (!action) return

    actionRef.current = action

    return () => action.fadeOut(0.2)
  }, [actions, state])

  useEffect(() => {
    const action = actionRef.current
    if (!action) return

    action.reset().fadeIn(0.2)

    if (state === 'bobbing') {
       action.setLoop(THREE.LoopRepeat)
    } else {
       action.setLoop(THREE.LoopRepeat)
    }
    
    action.play()
  }, [actions, state])

  return (
    <group ref={group}>
      <primitive 
        key={url} 
        object={scene} 
        scale={4.5} 
        position={[0, -3.5, 0]} 
      />
    </group>
  )
}

useGLTF.preload('/models/orbit_idle.glb')
useGLTF.preload('/models/orbit_bobbing.glb')