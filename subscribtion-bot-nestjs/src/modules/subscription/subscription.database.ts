import { Coordinates } from './subscription.interface';

{
  const Subscription = require('./subscription.model');
  // eslint-disable-next-line
  const mongoose = require('../../database/index');
  const logger = require('../../utils/logger');
  const updateLocation = async (
    username: string,
    lat: string,
    lon: string,
  ): Promise<void> => {
    try {
      await Subscription.updateOne(
        { userName: username },
        { $set: { 'coordinates.lat': lat, 'coordinates.lon': lon } },
      );
    } catch (err) {
      logger.error(err);
    }
  };

  const deleteSubscription = async (
    msg,
    hour: string,
    minute: string,
  ): Promise<void> => {
    try {
      const result = await Subscription.updateOne(
        { userName: msg.from.username },
        { $pull: { times: { hour, minute } } },
      );
      if (result.modifiedCount === 0) {
        throw new Error('there is nothing to delete');
      }
    } catch (err) {
      logger.error(err);
    }
  };

  const getByUsername = async (
    username: string,
  ): Promise<typeof Subscription> => {
    try {
      return await Subscription.findOne({ userName: username });
    } catch (err) {
      logger.error(err);
    }
  };

  const getAllSubscriptions = async (): Promise<(typeof Subscription)[]> => {
    try {
      return await Subscription.find();
    } catch (err) {
      logger.error(err);
    }
  };

  const addSubscription = async (
    msg,
    hour: string,
    minute: string,
    userData: Coordinates,
  ): Promise<void> => {
    try {
      const existingSubscription = await Subscription.findOne({
        userId: msg.from.id,
        userName: msg.from.username,
        chatId: msg.chat.id,
      });

      if (existingSubscription) {
        const existingTime = existingSubscription.times.find(
          (time) => time.hour === hour && time.minute === minute,
        );
        if (existingTime) {
          throw new Error('subscription at this time already exists');
        }
        existingSubscription.times.push({ hour, minute });
        await existingSubscription.save();
      } else {
        const newSubscription = new Subscription({
          userId: msg.from.id,
          userName: msg.from.username,
          times: [{ hour, minute }],
          chatId: msg.chat.id,
          coordinates: {
            lat: userData.lat,
            lon: userData.lon,
          },
        });
        await newSubscription.save();
      }
    } catch (err) {
      logger.error(err);
    }
  };

  module.exports = {
    updateLocation,
    deleteSubscription,
    getByUsername,
    getAllSubscriptions,
    addSubscription,
  };
}
