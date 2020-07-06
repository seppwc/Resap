# Resap
React hooks for easy GSAP animations, cause why not?

```javascript
npm install resap
```

+ useToggle (toggles GSAP animation from base css styling to stated animation based on state changes)

```javascript 
//import useToggle from resap library

import { useToggle } from 'resap'

// create your state!
 const [open, set] = React.useState(true);

// create a handler to change your state
 const handleClick = () => {
    set(!open);
  };


// set your gsap animation props! (use useRef or useMemo so the object doesn't get recreated on each render!)
 const { current: animProps } = React.useRef({
    opacity: 0,
    y: 30,
    duration: 0.2,
    ease: 'power3.out',
  });

// call the useToggle hook which returns a ref, passing in your state and the animation props!
  const ref = useToggle(open, animProps);

// pass your ref to the object you wish to animate! when your state changes the toggle animation will trigger!
return (
   <div ref={ref} onClick={handleClick} />
)
```

(More hooks to be included!)
