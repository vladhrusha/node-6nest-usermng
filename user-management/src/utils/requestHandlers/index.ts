{
  const handleAddUser = require('./handleAddUser.ts');
  const handleGetByNickname = require('./handleGetByNickname.ts');
  const handleGetUsers = require('./handleGetUsers.ts');
  const handleUpdateUser = require('./handleUpdateUser.ts');
  const handleDeleteUser = require('./handleDeleteUser.ts');
  const handleVote = require('./handleVote.ts');
  const handleLogin = require('./handleLogin.ts');

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
