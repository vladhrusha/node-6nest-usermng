{
  const handleAddUser = async (reqBody): Promise<void> => {
    const { addUser } = require('../user.database');
    const logger = require('../../../utils/logger');
    const encrypt = require('../../../utils/encrypt');
    const { nickname, lastname, firstname } = reqBody;
    let { password } = reqBody;
    const encryptionResult = await encrypt(password);
    const salt = encryptionResult.salt;
    password = encryptionResult.password;
    await addUser({ nickname, password, firstname, lastname, salt });
  };
  module.exports = handleAddUser;
}
