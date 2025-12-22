import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'

import { createStateMutation } from '../src/createStateMutation'
import { createStateContext } from '../src/createStateContext'
import StateProvider from '../src/provider'

describe('createStateMutation', () => {
  it('should create a hook bound to the context', () => {
    const TestContext = createStateContext<{ count: number }>()
    const useTestMutation = createStateMutation(TestContext)

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StateProvider context={TestContext} initialState={{ count: 0 }}>
        {children}
      </StateProvider>
    )

    const { result } = renderHook(() => useTestMutation(), { wrapper })

    expect(typeof result.current).toBe('function')
  })
})
