import React from 'react'
import gsap from 'gsap'

enum ResapTweenTypes {
  // eslint-disable-next-line no-unused-vars
  TO = 'TO',
  // eslint-disable-next-line no-unused-vars
  FROM = 'FROM',
  // eslint-disable-next-line no-unused-vars
  FROMTO = 'FROMTO',
}

interface ResapTweenVars extends GSAPTweenVars {
  tween?: string
}

type useTweenHook = (
  options: ResapTweenVars | ResapTweenVars[],
  state?: any
) => [VoidFunction, GSAPTween]

export const useTween: useTweenHook = (
  state: any = false,
  options: ResapTweenVars | ResapTweenVars[]
): [VoidFunction, GSAPTween] => {
  const [r, setRef] = React.useState<GSAPTweenTarget>(window)

  const [t, setTween] = React.useState<GSAPTween>()

  const getTweens = React.useCallback(
    (o) => {
      const { tween, ...rest } = o
      switch (tween.toUpperCase()) {
        case ResapTweenTypes.FROM:
          return gsap.from(r, rest)
        default:
          return gsap.to(r, rest)
      }
    },
    [r]
  )

  React.useLayoutEffect(() => {
    if (options instanceof Array) {
      // TODO: account for an array of options working as a fromTO
      console.log(options)
    } else {
      setTween(getTweens(options))
    }
  }, [r])

  React.useLayoutEffect(() => {
    t && t.play()
  }, [state])

  return [setRef as VoidFunction, t as GSAPTween]
}
