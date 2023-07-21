{
  const handleUpdateUser = async ({ context, input }): Promise<void> => {
    /* eslint-disable camelcase */
    const { updateUser, getByNickname } = require('../user.database');
    const encrypt = require('../../../utils/encrypt');

    const { nickname, lastname, firstname, newPassword } = input;

    const encryptionResult = await encrypt(newPassword);
    const salt = encryptionResult.salt;
    const encryptedPassword = encryptionResult.password;
    const updated_at = Date.now();
    const user = await getByNickname({ nickname });
    const lastModified = user.updated_at;

    const ifUnmodifiedSince = new Date(
      context.req.headers['if-unmodified-since'],
    );

    if (ifUnmodifiedSince && new Date(ifUnmodifiedSince) < lastModified) {
      throw new Error('User has been modified since last retrieved');
    }

    updateUser({
      nickname,
      encryptedPassword,
      firstname,
      lastname,
      salt,
      updated_at,
    });
  };

  module.exports = handleUpdateUser;
}
