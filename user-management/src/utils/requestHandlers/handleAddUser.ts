const handleAddUser = async (reqBody) => {
  const { addUser } = require('../../services/user.service.ts');
  const logger = require('../logger.ts');
  const encrypt = require('../encrypt.ts');
  const { nickname, lastname, firstname } = reqBody;
  let { password } = reqBody;
  const encryptionResult = await encrypt(password);
  const salt = encryptionResult.salt;
  password = encryptionResult.password;
  addUser({ nickname, password, firstname, lastname, salt });
};
module.exports = handleAddUser;
