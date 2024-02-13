import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorRespose } from '../interfaces/common';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorRespose => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorMessages: errors,
  };
};
export default handleValidationError;
