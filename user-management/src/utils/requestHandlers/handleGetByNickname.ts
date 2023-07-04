{
  const handleGetByNickname = async (nickname) => {
    const { getByNickname } = require('../../services/user.service');
    const dbResponse = await getByNickname({ nickname });
    return {
      nickname: dbResponse.nickname,
      password: dbResponse.password,
      firstname: dbResponse.firstname,
      lastname: dbResponse.lastname,
      updated_at: dbResponse.updated_at,
    };
  };
  module.exports = handleGetByNickname;
}
