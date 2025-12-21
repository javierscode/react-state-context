import React, { createContext, useRef } from 'react'
import type { StateContext, StateContextProviderProps, Store } from './types'
import { createStore } from './createStore'

export function createStateContext<TState>(): StateContext<TState> {
  const StoreContext = createContext<Store<TState> | null>(null)

  function StateProvider({ children, initialState }: StateContextProviderProps<TState>) {
    const storeRef = useRef<Store<TState> | null>(null)
    if (!storeRef.current) {
      storeRef.current = createStore(initialState)
    }
    return (
      <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
    )
  }

  return Object.assign(StoreContext, { Provider: StateProvider })
}
