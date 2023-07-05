import { HttpException, HttpStatus } from '@nestjs/common';

{
  const base64 = require('base-64');
  const { authenticate } = require('./authenticate');
  const authMiddleware = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const credentials = base64.decode(authHeader.split(' ')[1]);
      const [nickname, password] = credentials.split(':');
      const authenticated = await authenticate({ nickname, password });
      if (authenticated) {
        next();
      } else {
        throw new HttpException(
          { error: 'Unauthorized' },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw new HttpException({ err: error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
  module.exports = { authMiddleware };
}
