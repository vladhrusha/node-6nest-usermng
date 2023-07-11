// {
//   const logger = require('../../../utils/logger');
//   const onGetUserLocation = require('../utils/onGetUserLocation');
//   const { requestLocation, respondLocation } = require('../utils/messages');
//   const handleStart = async (chatId, bot, userData) => {
//     try {
//       await requestLocation(bot, chatId);
//     } catch (err) {
//       logger.error(err);
//     }
//     userData = await onGetUserLocation(bot);
//     try {
//       await respondLocation(bot, chatId);
//     } catch (err) {
//       logger.error(err);
//     }
//     return userData;
//   };

//   module.exports = handleStart;
// }
