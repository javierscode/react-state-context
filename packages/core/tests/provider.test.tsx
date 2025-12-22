import React, { useContext } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import StateProvider from '../src/provider'
import { createStateContext } from '../src/createStateContext'

describe('StateProvider', () => {
  it('should provide the store to children', () => {
    const TestContext = createStateContext<{ count: number }>()

    const Consumer = () => {
      const store = useContext(TestContext)
      return <div data-testid='value'>{store?.getState().count}</div>
    }

    render(
      <StateProvider context={TestContext} initialState={{ count: 42 }}>
        <Consumer />
      </StateProvider>
    )

    expect(screen.getByTestId('value').textContent).toBe('42')
  })

  it('should create store only once across re-renders', () => {
    const TestContext = createStateContext<{ count: number }>()
    let storeRef: unknown = null

    const Consumer = () => {
      const store = useContext(TestContext)
      if (!storeRef) {
        storeRef = store
      }
      return <div data-testid='same'>{store === storeRef ? 'same' : 'different'}</div>
    }

    const { rerender } = render(
      <StateProvider context={TestContext} initialState={{ count: 0 }}>
        <Consumer />
      </StateProvider>
    )

    // Re-render the same component
    rerender(
      <StateProvider context={TestContext} initialState={{ count: 0 }}>
        <Consumer />
      </StateProvider>
    )

    expect(screen.getByTestId('same').textContent).toBe('same')
  })

  it('should render children correctly', () => {
    const TestContext = createStateContext<{ name: string }>()

    render(
      <StateProvider context={TestContext} initialState={{ name: 'test' }}>
        <div data-testid='child'>Hello World</div>
      </StateProvider>
    )

    expect(screen.getByTestId('child').textContent).toBe('Hello World')
  })
})
