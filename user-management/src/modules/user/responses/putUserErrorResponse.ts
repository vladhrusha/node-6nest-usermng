import { HttpException, HttpStatus } from '@nestjs/common';

{
  const putUserErrorResponse = (err: Error): void => {
    switch (err.message) {
      case 'User has been modified since last retrieved':
        throw new HttpException(
          { message: err.message },
          HttpStatus.PRECONDITION_FAILED,
        );
        break;
      default:
        throw new HttpException(
          { message: err.message },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        break;
    }
  };

  module.exports = putUserErrorResponse;
}
