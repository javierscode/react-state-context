import { describe, it, expect } from 'vitest'

import { shallowEqual } from '../src/shallowEqual'

describe('shallowEqual', () => {
  it('should return true for identical references', () => {
    const obj = { a: 1 }
    expect(shallowEqual(obj, obj)).toBe(true)
  })

  it('should return true for primitives with same value', () => {
    expect(shallowEqual(1, 1)).toBe(true)
    expect(shallowEqual('hello', 'hello')).toBe(true)
    expect(shallowEqual(true, true)).toBe(true)
    expect(shallowEqual(null, null)).toBe(true)
    expect(shallowEqual(undefined, undefined)).toBe(true)
  })

  it('should return false for different primitives', () => {
    expect(shallowEqual(1, 2)).toBe(false)
    expect(shallowEqual('a', 'b')).toBe(false)
    expect(shallowEqual(true, false)).toBe(false)
  })

  it('should return true for shallow equal objects', () => {
    expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true)
  })

  it('should return false for objects with different values', () => {
    expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false)
  })

  it('should return false for objects with different keys', () => {
    expect(shallowEqual({ a: 1 }, { b: 1 })).toBe(false)
    expect(shallowEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false)
  })

  it('should return false for nested objects (not deep equal)', () => {
    expect(shallowEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(false)
  })

  it('should return true for arrays with same elements', () => {
    expect(shallowEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  it('should return false for arrays with different elements', () => {
    expect(shallowEqual([1, 2], [1, 3])).toBe(false)
  })

  it('should handle null and undefined comparisons', () => {
    expect(shallowEqual(null, undefined)).toBe(false)
    expect(shallowEqual(null, { a: 1 })).toBe(false)
    expect(shallowEqual({ a: 1 }, null)).toBe(false)
  })

  it('should handle NaN correctly', () => {
    expect(shallowEqual(NaN, NaN)).toBe(true)
    expect(shallowEqual({ a: NaN }, { a: NaN })).toBe(true)
  })
})
