import gsap, { CSSPlugin } from 'gsap'
import React from 'react'

React.useEffect(() => {
  gsap.registerPlugin(CSSPlugin)
}, [])

export { useToggle } from './hooks/useToggle'
export { useGSAP } from './hooks/useGSAP'
