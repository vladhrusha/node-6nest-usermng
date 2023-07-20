{
  const handleVote = async (req, input) => {
    const { addVote } = require('../vote.database');
    const { destNickname, value } = input;
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
