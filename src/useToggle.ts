import React from 'react'
import gsap from 'gsap'

type OptionProp = gsap.TweenVars | gsap.CSSVars

type ResapToggleFunction = (
  state: boolean,
  options: OptionProp | OptionProp[]
) => VoidFunction

type ResapAnimateFunction = () => void

export const useToggle: ResapToggleFunction = (
  state: boolean,
  options: OptionProp | OptionProp[]
) => {
  const [ref, setRef] = React.useState<gsap.TweenTarget>(null)
  const [loaded, setLoaded] = React.useState(0)
  const { current: tl } = React.useRef<gsap.core.Timeline>(
    gsap.timeline({ paused: true })
  )

  React.useLayoutEffect(() => {
    tl.reversed(state)
    if (options instanceof Array) {
      options.forEach((option: OptionProp) => {
        tl.to(ref, option)
      })
    } else {
      tl.to(ref, options)
    }
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

  return setRef as VoidFunction
}
