'use client'

import { StateProvider } from '@javierscode/react-state-context'
import { CheckoutContext } from './context'
import { initialCheckoutState } from './CheckoutState'

export function CheckoutProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <StateProvider context={CheckoutContext} initialState={initialCheckoutState}>
      {children}
    </StateProvider>
  )
}
