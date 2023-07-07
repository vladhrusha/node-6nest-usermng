{
  const handleDeleteUser = (body): void => {
    /* eslint-disable camelcase */
    const { deleteUserByName } = require('../user.database');
    const nickname = body.nickname;
    const deleted_at = Date.now();
    deleteUserByName({ nickname, deleted_at });
  };

  module.exports = handleDeleteUser;
}
