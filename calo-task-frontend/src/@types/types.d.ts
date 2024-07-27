/**
 * Defined some of the common types
 */
type ReactNode = import('react').ReactNode
type Component = import('react').Component
type TFunction = () => void
type TObject = Record<string, number | string | undefined | boolean | TFunction>;
type TArrayOfObjects = Array<Record<string, number | string | undefined | boolean | TFunction>>;
type TNumberOrString = number | string
type TFunctionOrObject = TFunction | TObject
type allAnyTypes =
  | TObject
  | TFunction
  | boolean
  | string
  | number
