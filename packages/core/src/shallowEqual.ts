/**
 * Performs a shallow equality comparison between two values.
 *
 * Handles the following types:
 * - Primitives (number, string, boolean, bigint, symbol): compared by value using Object.is()
 * - null/undefined: compared by reference using Object.is()
 * - NaN: correctly handled (NaN === NaN returns true)
 * - Functions: compared by reference
 * - Objects/Arrays: compared by shallow key-value equality
 * - Date, RegExp, Map, Set: compared as objects with no enumerable keys,
 *   so different instances are considered equal unless used as object properties
 */
export const shallowEqual = <T>(a: T, b: T): boolean => {
  // Object.is handles:
  // - Same reference (objects, arrays, functions)
  // - Same primitive value (number, string, boolean, bigint, symbol)
  // - Special cases: NaN === NaN (true), +0 !== -0
  if (Object.is(a, b)) return true

  // If either value is null, undefined, or a primitive (not an object),
  // and they weren't caught by Object.is above, they're not equal.
  // This also catches: function !== function (different references)
  if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  // At this point, both a and b are objects (including arrays, Date, RegExp, Map, Set)
  // We compare their enumerable own properties
  // Note: Date, RegExp, Map, Set have no enumerable keys, so they'll be considered equal
  // if they reach this point (different instances with same "empty" keys)
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  // Different number of keys = not equal
  if (keysA.length !== keysB.length) return false

  // Check each key exists in both objects and has the same value (by reference)
  // This means nested objects/arrays are compared by reference, not deep equality
  for (const key of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      !Object.is((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
    ) {
      return false
    }
  }

  return true
}
