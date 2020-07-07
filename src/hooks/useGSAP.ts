import gsap from 'gsap'
import React from 'react'

type useGSAPhook = () => GSAP

export const useGSAP: useGSAPhook = () => {
  const { current: g } = React.useRef<GSAP>(gsap)
  return g
}
