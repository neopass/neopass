
export interface IPasswordInfo {
  readonly password: string
  readonly length: number
  readonly depth: number
  readonly topology: string
  readonly classes: string
  readonly entropy: number
  readonly shannon: number
}
