const handleVote = async (req) => {
  const { addVote } = require('../../services/user.service.ts');
  const logger = require('../logger');
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
