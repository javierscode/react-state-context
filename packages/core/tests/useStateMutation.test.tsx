import React, { useContext } from 'react'
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useStateMutation } from '../src/useStateMutation'
import { createStateContext } from '../src/createStateContext'
import StateProvider from '../src/provider'
import { Store } from '../src/types'

describe('useStateMutation', () => {
  it('should throw error when used outside provider', () => {
    const TestContext = createStateContext<{ count: number }>()

    expect(() => {
      renderHook(() => useStateMutation(TestContext))
    }).toThrow('useStateMutation must be used inside a StateProvider')
  })

  it('should return a mutate function', () => {
    const TestContext = createStateContext<{ count: number }>()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StateProvider context={TestContext} initialState={{ count: 0 }}>
        {children}
      </StateProvider>
    )

    const { result } = renderHook(() => useStateMutation(TestContext), { wrapper })

    expect(typeof result.current).toBe('function')
  })

  it('should update state with direct value', () => {
    type TestState = { count: number }
    const TestContext = createStateContext<TestState>()
    let storeRef: Store<TestState> | null = null

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StateProvider context={TestContext} initialState={{ count: 0 }}>
        {children}
      </StateProvider>
    )

    const { result } = renderHook(
      () => {
        const mutate = useStateMutation(TestContext)
        const store = useContext(TestContext)
        storeRef = store
        return mutate
      },
      { wrapper }
    )

    act(() => {
      result.current({ count: 5 })
    })

    expect(storeRef!.getState().count).toBe(5)
  })

  it('should update state with updater function', () => {
    type TestState = { count: number }
    const TestContext = createStateContext<TestState>()
    let storeRef: Store<TestState> | null = null

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StateProvider context={TestContext} initialState={{ count: 10 }}>
        {children}
      </StateProvider>
    )

    const { result } = renderHook(
      () => {
        const mutate = useStateMutation(TestContext)
        const store = React.useContext(TestContext)
        storeRef = store
        return mutate
      },
      { wrapper }
    )

    act(() => {
      result.current((prev) => ({ count: prev.count + 5 }))
    })

    expect(storeRef!.getState().count).toBe(15)
  })

  it('should maintain stable mutate function reference', () => {
    const TestContext = createStateContext<{ count: number }>()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StateProvider context={TestContext} initialState={{ count: 0 }}>
        {children}
      </StateProvider>
    )

    const { result, rerender } = renderHook(() => useStateMutation(TestContext), {
      wrapper,
    })

    const firstMutate = result.current

    rerender()

    expect(result.current).toBe(firstMutate)
  })
})
