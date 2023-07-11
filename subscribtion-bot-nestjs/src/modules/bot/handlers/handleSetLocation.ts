// {
//   const logger = require('../../../utils/logger');
//   const { requestLocation, respondLocation } = require('../utils/messages');

//   const {
//     updateLocation,
//   } = require('../../subscription/subscription.database');
//   const handleSetLocation = async (msg, chatId, bot, userData) => {
//     try {
//       await requestLocation(bot, chatId);
//     } catch (err) {
//       logger.error(err);
//     }
//     userData = await onGetUserLocation(bot);
//     try {
//       await respondLocation(bot, chatId);
//       updateLocation(
//         msg.from.username,
//         userData.coordinates.lat,
//         userData.coordinates.lon,
//       );
//     } catch (err) {
//       logger.error(err);
//     }
//     return userData;
//   };

//   module.exports = handleSetLocation;
// }
