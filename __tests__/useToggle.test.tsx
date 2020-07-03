/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react'
import sinon from 'sinon'
import { renderHook, cleanup as cleanupHooks } from '@testing-library/react-hooks'
import {
  render,
  cleanup as cleanupReact,
  fireEvent,
  waitFor,
} from '@testing-library/react'
import { useToggle } from '../src'

describe('useToggle', () => {
  beforeEach(() => {
    cleanupHooks()
    cleanupReact()
  })

  afterEach(sinon.restore)

  it('should be a function', () => {
    const { result } = renderHook(() => useToggle(false, { x: 100 }))
    expect(result.current).toBeInstanceOf(Function)
  })

  it('should fire animation when state is changed', () => {
    const TestElement = () => {
      const [open, set] = React.useState(false)
      const ref = useToggle(open, { x: 100, duration: 1 })

      const handleClick = () => {
        set(!open)
      }

      return <div ref={ref} onClick={handleClick} />
    }
    const container = render(<TestElement />)
    fireEvent(container.baseElement, new MouseEvent('click'))
    waitFor(() => expect(container.baseElement.getBoundingClientRect().x).toBe(100))
  })
})
