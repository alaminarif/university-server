import { IGenericErrorMessage } from './error'

export type IGenericErrorRespose = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
