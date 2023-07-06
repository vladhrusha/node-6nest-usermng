{
  const handleGetByNickname = async (nickname: string): Promise<object> => {
    const { getByNickname } = require('../user.database');
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
