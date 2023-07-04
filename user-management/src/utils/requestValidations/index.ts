{
  const addUserValidation = require('./addUserValidation.ts');
  const getAllUsersValidation = require('./getAllUsersValidation.ts');
  const getByNicknameValidation = require('./getByNicknameValidation.ts');
  const updateUserValidation = require('./updateUserValidation.ts');
  const deleteByNicknameValidation = require('./deleteByNicknameValidation.ts');

  module.exports = {
    addUserValidation,
    getAllUsersValidation,
    getByNicknameValidation,
    updateUserValidation,
    deleteByNicknameValidation,
  };
}
