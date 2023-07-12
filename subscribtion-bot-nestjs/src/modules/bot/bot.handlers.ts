import { Coordinates } from '../subscription/subscription.interface';
type SubscriptionMap = Map<number, boolean>;
import { Context } from 'telegraf';

{
  const logger = require('../../utils/logger');
  const {
    requestTime,
    requestLocation,
    respondLocation,
  } = require('./utils/messages');
  const {
    deleteSubscription,
    addSubscription,
    updateLocation,
  } = require('../subscription/subscription.database');
  const handleAddError = require('./utils/errors/handleAddError');
  const handleDeleteError = require('./utils/errors/handleDeleteError');
  const addCronJob = require('./utils/addCronJob');
  const handleHelp = async (ctx: Context): Promise<void> => {
    ctx.reply('Hi there!', {
      reply_markup: {
        keyboard: [
          [{ text: '/location' }, { text: '/sub' }, { text: '/unsub' }],
        ],
      },
    });
  };
  const handleSub = async (
    chatId: number,
    bot: Context,
    isSubscribingMap: SubscriptionMap,
  ): Promise<SubscriptionMap> => {
    try {
      isSubscribingMap.set(chatId, true);
      await requestTime(bot, chatId, isSubscribingMap.get(chatId));
      return isSubscribingMap;
    } catch (err) {
      logger.error(err);
    }
  };
  const handleUnsub = async (
    chatId: number,
    bot: Context,
    isSubscribingMap: SubscriptionMap,
    userName: string,
  ): Promise<SubscriptionMap> => {
    try {
      isSubscribingMap.set(chatId, false);
      await requestTime(bot, chatId, isSubscribingMap.get(chatId), userName);
      return isSubscribingMap;
    } catch (err) {
      logger.error(err);
    }
  };

  interface SubscriptionData {
    isSubscribingMap: SubscriptionMap;
    chatId: number;
    msg: any;
    hour: number;
    minute: number;
    ctx: Context;
    userData: Coordinates;
  }
  const handleSubscriptionMessages = async ({
    isSubscribingMap,
    chatId,
    msg,
    hour,
    minute,
    ctx,
    userData,
  }: SubscriptionData) => {
    if (isSubscribingMap.get(chatId) === false) {
      await ctx.reply('Thanks for choosing the unsub time!');
      try {
        await deleteSubscription(msg, hour, minute);
        ctx.reply(
          `You have unsubscribed from weather daily report at ${hour}:${minute}`,
        );
      } catch (err) {
        handleDeleteError(err, ctx, chatId);
      }
    } else {
      await ctx.reply('Thanks for sending the sub time!');
      try {
        await addCronJob(chatId, ctx.telegram, hour, minute, userData);
        await addSubscription(msg, hour, minute, userData);
        ctx.reply(
          `You have subscribed on weather daily report at ${hour}:${minute}`,
        );
      } catch (err) {
        handleAddError(err, ctx, chatId);
        logger.error(err);
      }
    }
  };

  module.exports = {
    handleHelp,
    handleSub,
    handleUnsub,
    handleSubscriptionMessages,
  };
}
