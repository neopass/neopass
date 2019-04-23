import { IValidator, RequestType } from '../validator'
import { IPasswordInfo } from '../password-info'

/**
 * Run a validator against a password/info and return any errors
 * it generates.
 */
export function runValidator(
  validator: IValidator,
  password: string,
  info: IPasswordInfo,
) {
  // Create a set of the requested stats items.
  const request = new Set(validator.request || [])

  // The arguments to be passed to the validation handler.
  const args: any[] = []

  // Handle password requests specially.
  if (request.has('password')) {
    args.push(password)
    request.delete('password')
  }

  // Map request strings to their corresponding stats items.
  const _requests = [...request].map(r => info[<RequestType>r])

  // Add the request variables to the arguments.
  args.push.apply(args, _requests)

  // Run validation.
  const errors = validator.validate(...args)

  return errors
}
