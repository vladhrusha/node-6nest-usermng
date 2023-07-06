{
  /* eslint-disable camelcase */
  const User = require('../user/user.model');
  const Vote = require('./vote.model');

  // eslint-disable-next-line
  const mongoose = require('../../db');
  // eslint-disable-next-line
  const logger = require('../../utils/logger');
  interface VoteData {
    value: number;
    sourceUserId: string;
    destNickname: string;
    sourceNickname: string;
  }
  const addVote = async ({
    value,
    sourceUserId,
    destNickname,
    sourceNickname,
  }: VoteData): Promise<string | void> => {
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
    // if (!recentVoteByUserFrom && voteByUserFrom) {
    //   return 'You can only vote once per hour.';
    // }
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

  // const deleteAllVotes = async (): Promise<void> => {
  //   await Vote.deleteMany();
  // };

  const calculateRatings = async (users: (typeof User)[]): Promise<void> => {
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
    addVote,
    // deleteAllVotes,
    calculateRatings,
  };
}
