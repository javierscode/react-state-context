import { useStateMutation } from './useStateMutation'
import { StateContext } from './types'

export function createStateMutation<TState>(context: StateContext<TState>) {
  return () => useStateMutation(context)
}
