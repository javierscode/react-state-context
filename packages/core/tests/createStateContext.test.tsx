import { describe, it, expect } from 'vitest'

import { createStateContext } from '../src/createStateContext'

describe('createStateContext', () => {
  it('should create a React context with null as default value', () => {
    const context = createStateContext<{ count: number }>()

    // The context should be a valid React context
    expect(context).toBeDefined()
    expect(context.Provider).toBeDefined()
    expect(context.Consumer).toBeDefined()
    // @ts-expect-error - _currentValue is not defined on the context type
    expect(context._currentValue).toBe(null)
  })
})
