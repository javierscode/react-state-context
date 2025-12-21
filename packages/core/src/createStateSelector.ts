import type { Selector, StateContext } from './types'
import { useStateSelector } from './useStateSelector'

export function createStateSelector<TState>(context: StateContext<TState>) {
  return <TSlice>(selector: Selector<TState, TSlice>) =>
    useStateSelector(context, selector)
}
