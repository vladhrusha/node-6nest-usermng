import { HttpException, HttpStatus } from '@nestjs/common';

{
  const postVoteErrorResponse = async (result) => {
    switch (result) {
      case 'You cannot vote for yourself.':
        throw new HttpException({ err: result }, HttpStatus.BAD_REQUEST);
      case 'Destination user not found.':
        throw new HttpException({ err: result }, HttpStatus.NOT_FOUND);
      case 'You can only vote once per hour.':
        throw new HttpException({ err: result }, HttpStatus.TOO_MANY_REQUESTS);
      default:
        return 'success';
    }
  };

  module.exports = postVoteErrorResponse;
}
