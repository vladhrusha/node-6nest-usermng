import { Controller, Post, Req } from '@nestjs/common';

{
  const User = require('../../user/user.model');

  const handleLogin = async (req): Promise<any> => {
    const { getByNickname } = require('../../user/user.database');
    const base64 = require('base-64');
    const authHeader = req.headers.authorization;
    const credentials = base64.decode(authHeader.split(' ')[1]);
    const [nickname] = credentials.split(':');
    return await getByNickname({ nickname });
  };
  module.exports = handleLogin;
}
