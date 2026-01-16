import { useEffect, useRef, useState } from 'react'
import Scene from './Scene'
import Model from './Model'

const STATES = {
  IDLE: 'idle',
  LOOKING: 'looking',
  BOBBING: 'bobbing'
}

export default function ModelController() {
  const [state, setState] = useState(STATES.IDLE)
  const timerRef = useRef(null)

  useEffect(() => {
    clearTimeout(timerRef.current)

    if (state !== STATES.IDLE) return

    const delay = 10000 + Math.random() * 10000
    timerRef.current = setTimeout(() => {
      setState(STATES.LOOKING)
    }, delay)

    return () => clearTimeout(timerRef.current)
  }, [state])

  const handleCanvasClick = () => {
    clearTimeout(timerRef.current)
    setState(STATES.BOBBING)
  }

  const handleAnimationEnd = () => {
    setState(STATES.IDLE)
  }

  return (
    <Scene onCanvasClick={handleCanvasClick}>
      <Model state={state} onAnimationEnd={handleAnimationEnd} />
    </Scene>
  )
}