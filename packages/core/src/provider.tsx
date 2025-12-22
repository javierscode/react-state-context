import React from 'react'
import { useRef } from 'react'
import { createStore } from './createStore'
import { Store } from './types'

export type StateContextProviderProps<TState> = {
  children: React.ReactNode
  initialState: TState
  context: React.Context<Store<TState> | null>
}

export default function StateProvider<TState>({
  children,
  initialState,
  context: StoreContext,
}: StateContextProviderProps<TState>) {
  const storeRef = useRef<Store<TState> | null>(null)
  if (!storeRef.current) {
    storeRef.current = createStore(initialState)
  }

  return (
    <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
  )
}
