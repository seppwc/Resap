/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react'
import sinon from 'sinon'
import { renderHook, cleanup as cleanupHooks } from '@testing-library/react-hooks'
import { render, cleanup as cleanupReact, waitFor } from '@testing-library/react'
import { useGSAP } from '../src'
import pkg from '../package.json'

describe('useGSAP', () => {
  beforeEach(() => {
    cleanupHooks()
    cleanupReact()
  })

  afterEach(sinon.restore)

  it('should be a GSAP object', () => {
    const { result } = renderHook(() => useGSAP())
    expect(result.current.version).toStrictEqual(pkg.dependencies.gsap.slice(1))
  })

  it('should be able to set a tween from global gsap object', () => {
    const TestElement = () => {
      const ref = React.useRef(null)
      const g = useGSAP()

      React.useLayoutEffect(() => {
        g.to(ref.current, { x: 100 })
      }, [])

      return <div ref={ref} />
    }
    const container = render(<TestElement />)
    waitFor(() => expect(container.baseElement.getBoundingClientRect().x).toBe(100))
  })
})
