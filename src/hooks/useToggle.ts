import React from 'react'
import gsap from 'gsap'

type ResapToggleFunction = (
  initialState: boolean,
  options: gsap.TweenVars | gsap.CSSVars
) => Array<any>

type ResapAnimateFunction = () => void

export const useToggle: ResapToggleFunction = (
  initialState: boolean,
  options: gsap.TweenVars | gsap.CSSVars
): Array<any> => {
  const [ref, setRef] = React.useState<gsap.TweenTarget>(null)
  const [state, set] = React.useState(initialState)
  const { current: tl } = React.useRef<gsap.core.Timeline>(
    gsap.timeline({ paused: true })
  )
  const [toggleState, setToggle] = React.useState(initialState)

  React.useLayoutEffect(() => {
    tl.reversed(initialState)
    tl.to(ref, options)
  }, [tl, ref, options])

  React.useEffect(() => {
    setToggle(state)
  }, [state])

  const animate: ResapAnimateFunction = React.useCallback((): void => {
    state ? tl.play() : tl.reverse()
    set(!state)
  }, [tl, state, set])

  return [setRef, animate, toggleState]
}
