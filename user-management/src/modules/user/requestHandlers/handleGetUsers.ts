import { User } from '../user.interface';

{
  interface UsersResponse {
    users: User[];
    totalUsers: number;
    page: number;
    limit: number;
  }
  const handleGetUsers = async (reqBody): Promise<string | UsersResponse> => {
    const { getAllUsers } = require('../user.database');
    const page = reqBody?.page || 1;
    let limit;
    if (reqBody?.limit > 100) limit = 100;
    else limit = reqBody?.limit || 5;
    const offset = (page - 1) * limit;
    const { users, totalUsers } = await getAllUsers(offset, limit);

    if (users && totalUsers) {
      return await {
        users: users.map((entity) => {
          return {
            nickname: entity.nickname,
            firstname: entity.firstname,
            lastname: entity.lastname,
            updated_at: entity.updated_at,
          };
        }),
        totalUsers,
        page,
        limit,
      };
    } else {
      return 'null or undefined';
    }
  };

  module.exports = handleGetUsers;
}
