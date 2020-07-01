import assert from 'assert'
import { f } from '../src/index'

describe('message', () => {
  describe('f()', () => {
    it('should return "Hello [name]"', () => {
      assert.equal(f({ msg: 'bob' }), 'Hello bob')
    })
  })
})
