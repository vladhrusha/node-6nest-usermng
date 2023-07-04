{
  const handleAddUser = async (reqBody) => {
    const { addUser } = require('../../services/user.service');
    const logger = require('../logger');
    const encrypt = require('../encrypt');
    const { nickname, lastname, firstname } = reqBody;
    let { password } = reqBody;
    const encryptionResult = await encrypt(password);
    const salt = encryptionResult.salt;
    password = encryptionResult.password;
    await addUser({ nickname, password, firstname, lastname, salt });
  };
  module.exports = handleAddUser;
}
