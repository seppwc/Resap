# Resap

React hooks for easy GSAP animations, cause why not?

```javascript
npm install resap
```

## Hooks

\*_not currently available_

| Hooks              | description                                                                                                 | params                              | return                    |
| ------------------ | :---------------------------------------------------------------------------------------------------------- | :---------------------------------- | :------------------------ |
| useDraggable\*     | returns gsap.Draggable object using Draggable.create                                                        | DraggableVars                       | ref, Draggable[Object]    |
| useEase\*          | creates custom ease                                                                                         | easeVars                            | Ease[Object]              |
| useGSAP          | returns the basic gsap object to use if you need a method we dont cover                                     | none                                | GSAP[Object]              |
| useMotionPath      | create a motion path using the motionPath plugin                                                            | motionPathVars                      | MotionPath[Object]        |
| useToggle          | toggle trigger animation based on react state using gsap 'to', can optionally pass in an array of tweenvars | state ,tweenvars / tweenvars[Array] | ref                       |
| useTween\*         | returns a Tween                                                                                             | TweenVars[Object]                   | ref, Tween[Object]        |
| useTweens\*        | returns array refs and tweens for one config                                                                | num[Number], TweenVars[Object]      | refs[Array], Tween[Array] |
| useScrollTrigger\* | creates a scrolltigger object using new ScrollTrigger.create method                                         | ScrollTriggerVars                   | ScrollTrigger[Object]     |
| useScrollTo\*      | creates a scrollTo Object                                                                                   | ScrollToVars                        | ScrollTo[Object]          |
| useSet\*           | sets global defaults for tweens                                                                             | TweenVars                           | none                      |
| useText            | creates a text object with TextPlugin                                                                       | TextVars                            | textObject                |
| useTicker\*        | set a callback function to be called every frame of animation                                               | callback[Function]                  | none                      |
| useTimeline\*      | returns a gsap timeline object                                                                              | TweenVars[Array], Tween[Array]      | Timeline[Object]          |
| useUtility         | returns all utils function from gsap                                                                        | none                                | GSAP.utils[Object]        |

## API

### - **useToggle** (toggles GSAP animation from base css styling to stated animation based on state changes)

```javascript
//import useToggle from resap library

import { useToggle } from 'resap'

// create your state!
const [open, set] = React.useState(false)

// create a handler to change your state
const handleClick = () => {
  set(!open)
}

// set your gsap animation props! (use useRef or useMemo so the object doesn't get recreated on each render!)
const { current: animProps } = React.useRef({
  opacity: 0,
  y: 30,
  duration: 0.2,
  ease: 'power3.out',
})

// call the useToggle hook which returns a ref, passing in your state and the animation props!
const ref = useToggle(open, animProps)

// pass your ref to the object you wish to animate! when your state changes the toggle animation will trigger!
return <div ref={ref} onClick={handleClick} />

// you can also chain multiple tweens for your toggle by giving useToggle an array of objects

const { current: animProps } = React.useRef([
  {
    opacity: 0,
    y: 30,
    duration: 0.2,
    ease: 'power3.out',
  },
  {
    x: 10,
    skewY: 4,
    duration: 0.2,
    ease: 'power3.out',
  },
])
```

### - **useGSAP** (returns GSAP object)

if there is something which our hooks dont account for we provide the useGSAP hook for you to tap into the regular GSAP API

```javascript
import { useGSAP } from 'resap'

// get the entire GSAP Object
const gsap = useGSAP()

gsap.to(ref, {x: 100})

// OR

// Destructure just the methods you need

const {set, to} = useGSAP()

set({y: 100})
to(ref, {x: 100})
```


(More hooks to be included!)
