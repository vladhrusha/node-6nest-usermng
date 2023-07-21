{
  /* eslint-disable camelcase */
  const User = require('./user.schema');
  interface DeleteUserInput {
    nickname: string;
    deleted_at: string;
  }
  interface GetUserInput {
    nickname: string;
  }
  interface AddUserInput {
    nickname: string;
    firstname: string;
    lastname: string;
    password: string;
    salt: string;
  }
  interface UpdateUserInput {
    nickname: string;
    lastname: string;
    firstname: string;
    encryptedPassword: string;
    salt: string;
    updated_at: string;
  }
  // eslint-disable-next-line
  const mongoose = require('../../db/index');
  // eslint-disable-next-line
  const logger = require('../../utils/logger');
  // const deleteAllUsers = async () => {
  //   await User.deleteMany();
  // };
  const deleteUserByName = async ({
    nickname,
    deleted_at,
  }: DeleteUserInput): Promise<void> => {
    await User.updateOne(
      { nickname },
      {
        $set: {
          deleted_at,
        },
      },
    );
  };
  const getAllUsers = async (
    offset: number,
    limit: number,
  ): Promise<{ users: (typeof User)[]; totalUsers: number }> => {
    const users = await User.find().skip(offset).limit(limit);
    const totalUsers = await User.countDocuments();
    return { users, totalUsers };
  };
  const getByNickname = ({ nickname }: GetUserInput): typeof User => {
    return User.findOne({ nickname });
  };

  const addUser = ({
    nickname,
    firstname,
    lastname,
    password,
    salt,
  }: AddUserInput): void => {
    const newUser = new User({
      nickname,
      firstname,
      lastname,
      password,
      salt,
    });
    newUser.save();
  };

  const updateUser = async ({
    nickname,
    lastname,
    firstname,
    encryptedPassword,
    salt,
    updated_at,
  }: UpdateUserInput): Promise<void> => {
    const result = await User.updateOne(
      { nickname },
      {
        $set: {
          lastname,
          firstname,
          password: encryptedPassword,
          salt,
          updated_at,
        },
      },
    );

    return;
  };

  module.exports = {
    getAllUsers,
    addUser,
    getByNickname,
    updateUser,
    // deleteAllUsers,
    deleteUserByName,
  };
}
