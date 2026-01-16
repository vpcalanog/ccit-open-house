import { useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const MODEL_MAP = {
  idle: '/models/orbit_idle.glb',
  looking: '/models/orbit_looking.glb',
  bobbing: '/models/orbit_bobbing.glb'
}

export default function Model({ state, onAnimationEnd }) {
  const group = useRef()
  const actionRef = useRef(null)
  const finishedRef = useRef(false)

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

    finishedRef.current = false
    actionRef.current = action

    return () => action.fadeOut(0.2)
  }, [actions, state])

  useEffect(() => {
    const action = actionRef.current
    if (!action) return

    action.reset().fadeIn(0.2)

    if (state === 'idle') {
      action.setLoop(THREE.LoopRepeat)
    } else {
      action.setLoop(THREE.LoopOnce)
      action.clampWhenFinished = true
    }

    action.play()
  }, [actions, state])

  useFrame(() => {
    const action = actionRef.current
    if (!action || finishedRef.current) return

    if (
      (state === 'bobbing' || state === 'looking') &&
      action.time >= action.getClip().duration - 0.05
    ) {
      finishedRef.current = true
      onAnimationEnd()
    }
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={5} position={[0, -4, 0]} />
    </group>
  )
}

useGLTF.preload('/models/orbit_idle.glb')
useGLTF.preload('/models/orbit_looking.glb')
useGLTF.preload('/models/orbit_bobbing.glb')