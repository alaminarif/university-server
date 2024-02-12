import { ZodIssue, ZodError } from 'zod';
import { IGenericErrorRespose } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';
const handleValidationZodError = (error: ZodError): IGenericErrorRespose => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorMessages: errors,
  };
};
export default handleValidationZodError;
