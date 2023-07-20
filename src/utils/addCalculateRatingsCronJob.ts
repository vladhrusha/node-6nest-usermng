{
  const CronJob = require('cron').CronJob;
  const { calculateRatings, getAllUsers } = require('../services/user.service');

  const addCalculateRatingsCronJob = async (): Promise<void> => {
    const users = await getAllUsers();
    const job = new CronJob(
      '*/5 * * * * *',
      () => calculateRatings(users.users),
      null,
      true,
    );
    await job.start();
  };
  module.exports = addCalculateRatingsCronJob;
}
