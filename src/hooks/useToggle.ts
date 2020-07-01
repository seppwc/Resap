import React from 'react'
import gsap from 'gsap'

type ResapToggleFunction = (
  state: boolean,
  options: gsap.TweenVars | gsap.CSSVars
) => React.SetStateAction<React.SetStateAction<gsap.TweenTarget>>

type ResapAnimateFunction = () => void

export const useToggle: ResapToggleFunction = (
  state: boolean,
  options: gsap.TweenVars | gsap.CSSVars
): React.SetStateAction<React.SetStateAction<gsap.TweenTarget>> => {
  const [ref, setRef] = React.useState<gsap.TweenTarget>(null)
  const [loaded, setLoaded] = React.useState(0)
  const { current: tl } = React.useRef<gsap.core.Timeline>(
    gsap.timeline({ paused: true })
  )

  React.useLayoutEffect(() => {
    tl.reversed(state)
    tl.to(ref, options)
  }, [tl, ref, options])

  const animate: ResapAnimateFunction = React.useCallback((): void => {
    state ? tl.reverse() : tl.play()
  }, [tl, state])

  React.useEffect(() => {
    if (loaded) {
      animate()
    }
    setLoaded(loaded + 1)
  }, [state])

  return setRef
}
