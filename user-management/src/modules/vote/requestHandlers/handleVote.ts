{
  const handleVote = async (req) => {
    const { addVote } = require('../vote.database');
    const logger = require('../../../utils/logger');
    const { destNickname, value } = req.body;
    const sourceNickname = req.user.nickname;
    const sourceUserId = req.user.userId;

    const addVoteResult = await addVote({
      value,
      sourceUserId,
      destNickname,
      sourceNickname,
    });
    return addVoteResult;
  };

  module.exports = handleVote;
}
