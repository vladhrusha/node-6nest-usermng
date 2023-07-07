{
  interface PasswordData {
    password: string;
    salt: string;
  }
  const encrypt = async (password: string): Promise<PasswordData> => {
    const crypto = require('crypto');
    const util = require('util');
    const logger = require('./logger');

    const pbkdf2 = util.promisify(crypto.pbkdf2);

    try {
      const salt = crypto.randomBytes(16).toString('hex');

      const derivedKey = await pbkdf2(password, salt, 100000, 64, 'sha512');

      return { password: derivedKey.toString('hex'), salt };
    } catch (err) {
      logger.error(err);
    }
  };

  module.exports = encrypt;
}
