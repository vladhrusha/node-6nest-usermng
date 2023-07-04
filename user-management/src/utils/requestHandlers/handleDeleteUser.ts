const handleDeleteUser = (body) => {
  /* eslint-disable camelcase */
  const { deleteUserByName } = require('../../services/user.service.ts');
  const nickname = body.nickname;
  const deleted_at = Date.now();

  deleteUserByName({ nickname, deleted_at });
};

module.exports = handleDeleteUser;
