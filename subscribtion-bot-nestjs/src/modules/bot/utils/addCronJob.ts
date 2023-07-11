{
  const onSendWeatherReport = require('./onSendWeatherReport');
  const CronJob = require('cron').CronJob;
  require('dotenv').config();
  const TZ = process.env.TZ;

  const addCronJob = async (
    chadId: number,
    bot,
    hour: number,
    minute: number,
    coordinates,
  ) => {
    if (hour !== undefined && minute !== undefined) {
      const job = new CronJob(
        `${minute} ${hour} * * *`,
        () => onSendWeatherReport(chadId, coordinates, bot),
        null,
        true,
        TZ,
      );
      await job.start();
    }
  };
  module.exports = addCronJob;
}
