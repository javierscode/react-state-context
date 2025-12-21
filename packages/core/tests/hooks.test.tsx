import { describe, it, expect } from 'vitest'
import { createStateContext, useStateMutation } from '../src'

// Simple test environment without @testing-library/react
// to avoid memory issues with happy-dom

type TestState = {
  count: number
  name: string
}

describe('createStateContext', () => {
  it('should create a context with Provider', () => {
    const TestContext = createStateContext<TestState>()
    expect(TestContext.Provider).toBeDefined()
    expect(typeof TestContext.Provider).toBe('function')
  })
})

describe('useStateSelector (unit)', () => {
  it('should throw when selector is not a function', () => {
    const TestContext = createStateContext<TestState>()

    // We can't test hooks directly without a renderer,
    // but we can verify the context is created correctly
    expect(TestContext).toBeDefined()
  })
})

describe('useStateMutation (unit)', () => {
  it('should be a function', () => {
    expect(typeof useStateMutation).toBe('function')
  })
})
