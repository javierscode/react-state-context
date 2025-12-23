'use client'

import { StateProvider } from '@javierscode/react-state-context'
import { TaskBoardContext } from './context'
import { initialTaskBoardState } from './TaskBoardState'

export function TaskBoardProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <StateProvider context={TaskBoardContext} initialState={initialTaskBoardState}>
      {children}
    </StateProvider>
  )
}
