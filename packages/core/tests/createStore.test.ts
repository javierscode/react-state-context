import { describe, it, expect, vi } from 'vitest'

import { createStore } from '../src/createStore'

describe('createStore', () => {
  it('should create a store with initial state', () => {
    const store = createStore({ count: 0 })
    expect(store.getState()).toEqual({ count: 0 })
  })

  it('should update state with setState', () => {
    const store = createStore({ count: 0 })
    store.setState({ count: 1 })
    expect(store.getState()).toEqual({ count: 1 })
  })

  it('should not notify listeners if state is the same (Object.is)', () => {
    const initialState = { count: 0 }
    const store = createStore(initialState)
    const listener = vi.fn()

    store.subscribe(listener)
    store.setState(initialState)

    expect(listener).not.toHaveBeenCalled()
  })

  it('should notify listeners on state change', () => {
    const store = createStore({ count: 0 })
    const listener = vi.fn()

    store.subscribe(listener)
    store.setState({ count: 1 })

    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should unsubscribe listener correctly', () => {
    const store = createStore({ count: 0 })
    const listener = vi.fn()

    const unsubscribe = store.subscribe(listener)
    unsubscribe()
    store.setState({ count: 1 })

    expect(listener).not.toHaveBeenCalled()
  })

  it('should return server snapshot for SSR', () => {
    const store = createStore({ count: 0 })
    store.setState({ count: 5 })

    // Server snapshot should remain the initial state
    expect(store.getServerSnapshot()).toEqual({ count: 0 })
    expect(store.getState()).toEqual({ count: 5 })
  })

  it('should notify multiple listeners', () => {
    const store = createStore({ count: 0 })
    const listener1 = vi.fn()
    const listener2 = vi.fn()

    store.subscribe(listener1)
    store.subscribe(listener2)
    store.setState({ count: 1 })

    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(1)
  })
})
