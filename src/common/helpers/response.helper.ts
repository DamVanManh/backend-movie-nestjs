import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '../dtos/response.dto';
import { Response } from 'express';
export class ResponseHelper {
  static success<T>(
    data: T,
    message = 'Xử lý thành công!',
    status = HttpStatus.OK,
  ): ApiResponse<T> {
    return {
      statusCode: status,
      message,
      content: data,
      dateTime: new Date(),
    };
  }

  static error(message = 'Faild', status = HttpStatus.BAD_REQUEST): void {
    const data = {
      statusCode: status,
      message,
      content: null,
      dateTime: new Date(),
    };
    throw new HttpException(data, status);
  }

  static internalError<T>(status = HttpStatus.INTERNAL_SERVER_ERROR): void {
    const data = {
      statusCode: status,
      message: 'Internal error',
      content: null,
      dateTime: new Date(),
    };
    throw new HttpException(data, status);
  }
}
