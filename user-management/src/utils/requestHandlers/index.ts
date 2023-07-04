{
  const handleAddUser = require('./handleAddUser');
  const handleGetByNickname = require('./handleGetByNickname');
  const handleGetUsers = require('./handleGetUsers');
  const handleUpdateUser = require('./handleUpdateUser');
  const handleDeleteUser = require('./handleDeleteUser');
  const handleVote = require('./handleVote');
  const handleLogin = require('./handleLogin');

  module.exports = {
    handleAddUser,
    handleGetByNickname,
    handleGetUsers,
    handleUpdateUser,
    handleDeleteUser,
    handleLogin,
    handleVote,
  };
}
