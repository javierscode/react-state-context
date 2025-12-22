import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'

import { createStateSelector } from '../src/createStateSelector'
import { createStateContext } from '../src/createStateContext'
import StateProvider from '../src/provider'

describe('createStateSelector', () => {
  it('should create a hook bound to the context', () => {
    const TestContext = createStateContext<{ count: number }>()
    const useTestSelector = createStateSelector(TestContext)

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StateProvider context={TestContext} initialState={{ count: 42 }}>
        {children}
      </StateProvider>
    )

    const { result } = renderHook(() => useTestSelector((state) => state.count), {
      wrapper,
    })

    expect(result.current).toBe(42)
  })
})
