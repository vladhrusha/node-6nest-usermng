{
  const jwt = require('jsonwebtoken');
  require('dotenv').config();
  const secret = process.env.TOKEN_SECRET;

  const generateAccessToken = ({ user, userId }): string => {
    return jwt.sign(
      { nickname: user.nickname, role: user.role, userId },
      secret,
      {
        expiresIn: '36h',
      },
    );
  };
  module.exports = generateAccessToken;
}
