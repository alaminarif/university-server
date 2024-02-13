import { AcademicSemester } from './academicSemester.model';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterTitleMapper } from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semeter Code');
  }
  const result = await AcademicSemester.create(payload);
  // console.log(result);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
