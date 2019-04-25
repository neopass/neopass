import { IValidator, RequestType, IValidatorError } from '../validator'
import { IPasswordInfo } from '../neo-core'

/**
 * Run a validator against a password/info and return any errors
 * it generates.
 */
export function runValidator(
  validator: IValidator,
  info: IPasswordInfo,
): IValidatorError[] {
  // Create a set of the requested stats items.
  const request = new Set(validator.request || [])

  // The arguments to be passed to the validation handler.
  const args: any[] = []

  // Map request strings to their corresponding stats items.
  const _requests = [...request].map(r => info[<RequestType>r])

  // Add the request variables to the arguments.
  args.push.apply(args, _requests)

  // Run validation.
  return validator.validate(...args)
}
