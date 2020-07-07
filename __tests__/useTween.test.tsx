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
import gsap from 'gsap'
import { useTween } from '../src'

describe('useTween', () => {
  beforeEach(() => {
    cleanupHooks()
    cleanupReact()
  })

  afterEach(sinon.restore)

  describe('Tween: To', () => {
    it('should return ref and tween', () => {
      const { result } = renderHook(() => useTween({ tween: 'to', x: 100 }, false))
      const [ref, tween] = result.current
      expect(ref).toBeInstanceOf(Function)
      expect(tween).toBeInstanceOf(gsap.core.Tween)
    })

    it('should fire animation when state is changed', () => {
      const TestElement = () => {
        const [open, set] = React.useState(false)
        const [ref] = useTween({ tween: 'to', x: 100, duration: 1 }, open)

        const handleClick = () => {
          set(!open)
        }

        return <div ref={ref} onClick={handleClick} />
      }
      const container = render(<TestElement />)
      fireEvent(container.baseElement, new MouseEvent('click'))
      waitFor(() => expect(container.baseElement.getBoundingClientRect().x).toBe(100))
    })

    it('should fire an animation when the play method is called on the returned tween', () => {
      const TestElement = () => {
        const [ref, tween] = useTween({ tween: 'to', x: 100, duration: 1 })

        const handleClick = () => {
          tween.play()
        }

        return <div ref={ref} onClick={handleClick} />
      }

      const container = render(<TestElement />)
      fireEvent(container.baseElement, new MouseEvent('click'))
      waitFor(() => expect(container.baseElement.getBoundingClientRect().x).toBe(100))
    })
  })

  describe('Tween: From', () => {
    it('should return ref and tween', () => {
      const { result } = renderHook(() => useTween({ tween: 'from', x: 100 }, false))
      const [ref, tween] = result.current
      expect(ref).toBeInstanceOf(Function)
      expect(tween).toBeInstanceOf(gsap.core.Tween)
    })

    it('should fire animation when state is changed', () => {
      const TestElement = () => {
        const [open, set] = React.useState(false)
        const [ref] = useTween({ tween: 'from', x: 100, duration: 1 }, open)

        const handleClick = () => {
          set(!open)
        }

        return <div ref={ref} onClick={handleClick} />
      }
      const container = render(<TestElement />)
      expect(container.baseElement.getBoundingClientRect().x).toBe(100)
      fireEvent(container.baseElement, new MouseEvent('click'))
      waitFor(() => expect(container.baseElement.getBoundingClientRect().x).toBe(0))
    })

    it('should fire an animation when the play method is called on the returned tween', () => {
      const TestElement = () => {
        const [ref, tween] = useTween({ tween: 'to', x: 100, duration: 1 })

        const handleClick = () => {
          tween.play()
        }

        return <div ref={ref} onClick={handleClick} />
      }

      const container = render(<TestElement />)
      expect(container.baseElement.getBoundingClientRect().x).toBe(100)
      fireEvent(container.baseElement, new MouseEvent('click'))
      waitFor(() => expect(container.baseElement.getBoundingClientRect().x).toBe(0))
    })
  })
})
