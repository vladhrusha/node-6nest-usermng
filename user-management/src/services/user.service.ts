/* eslint-disable camelcase */
{
  const User = require('../models/User.ts');
  const Vote = require('../models/Vote.ts');

  // eslint-disable-next-line
  const mongoose = require('../db/index.ts');
  // eslint-disable-next-line
  const logger = require('../utils/logger.ts');
  const deleteAllUsers = async () => {
    await User.deleteMany();
  };
  const deleteUserByName = async ({ nickname, deleted_at }) => {
    await User.updateOne(
      { nickname },
      {
        $set: {
          deleted_at,
        },
      },
    );
  };
  const getAllUsers = async (offset, limit) => {
    const users = await User.find().skip(offset).limit(limit);
    const totalUsers = await User.countDocuments();
    return { users, totalUsers };
  };
  const getByNickname = async ({ nickname }) => {
    return await User.findOne({ nickname });
  };

  const addUser = async ({ nickname, firstname, lastname, password, salt }) => {
    const newUser = new User({
      nickname,
      firstname,
      lastname,
      password,
      salt,
    });
    await newUser.save();
  };

  const updateUser = async ({
    nickname,
    lastname,
    firstname,
    encryptedPassword,
    salt,
    updated_at,
  }) => {
    await User.updateOne(
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

  const addVote = async ({
    value,
    sourceUserId,
    destNickname,
    sourceNickname,
  }) => {
    const destinationUser = await User.findOne({
      nickname: destNickname,
    });
    const sourceUser = await User.findOne({
      _id: sourceUserId,
    });
    if (!destinationUser) {
      return 'Destination user not found.';
    }
    const vote = await Vote.findOne({
      userTo: destinationUser._id,
      userFrom: sourceUser._id,
    });

    const now = new Date();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const recentVoteByUserFrom = await Vote.findOne({
      userFrom: sourceUser._id,
      timestamp: { $lt: oneHourAgo },
    });
    const voteByUserFrom = await Vote.findOne({
      userFrom: sourceUser._id,
    });

    if (sourceNickname === destNickname) {
      return 'You cannot vote for yourself.';
    }
    if (!recentVoteByUserFrom && voteByUserFrom) {
      return 'You can only vote once per hour.';
    }
    if (vote && vote.timestamp) {
      const previousVote = vote.value;
      if (previousVote !== vote) {
        vote.value = value;
        vote.timestamp = now.getTime();
        await vote.save();
      }
    } else {
      const newVote = new Vote({
        userTo: destinationUser._id,
        userFrom: sourceUser._id,
        value,
      });
      await newVote.save();
    }
  };

  const deleteAllVotes = async () => {
    await Vote.deleteMany();
  };

  const calculateRatings = async (users) => {
    if (users) {
      for (const user of users) {
        const updatedVotes = await Vote.find({ userTo: user._id });
        const newRating = updatedVotes.reduce(
          (total, vote) => total + parseInt(vote.value),
          0,
        );

        user.rating = newRating;
        await user.save();
      }
    } else logger.error('unable to get users');
  };

  module.exports = {
    getAllUsers,
    addUser,
    getByNickname,
    updateUser,
    deleteAllUsers,
    deleteUserByName,
    addVote,
    deleteAllVotes,
    calculateRatings,
  };
}
