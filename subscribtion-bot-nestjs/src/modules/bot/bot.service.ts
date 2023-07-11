import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import {
  Ctx,
  Hears,
  Help,
  InjectBot,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context } from 'telegraf';
const handlers = require('./handlers/index');
const addCronJob = require('./utils/addCronJob');
const {
  getAllSubscriptions,
  updateLocation,
} = require('../subscription/subscription.database');
let userData;
let subs;
const { requestLocation, respondLocation } = require('./utils/messages');
const logger = require('../../utils/logger');
import { message } from 'telegraf/filters';

const handlersBot = require('./bot.handlers');
const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

let isSubscribingMap = new Map();
@Update()
@Injectable()
export class BotService implements OnModuleInit {
  constructor(@InjectBot() private bot: Telegraf<Context>) {}

  async onModuleInit() {
    subs = await getAllSubscriptions();
    if (subs.length === 1) {
      const sub = subs[0];
      sub.times.forEach((time) => {
        addCronJob(
          sub.chatId,
          this.bot.telegram,
          time.hour,
          time.minute,
          sub.coordinates,
        );
      });
    } else {
      subs.forEach((sub) => {
        sub.times.forEach((time) => {
          addCronJob(
            sub.chatId,
            this.bot.telegram,
            time.hour,
            time.minute,
            sub.coordinates,
          );
        });
      });
    }
  }
  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Welcome');
    try {
      await requestLocation(ctx);
    } catch (err) {
      logger.error(err);
    }
  }
  @On('location')
  async onLocation(ctx: Context) {
    if (ctx.has(message('location'))) {
      userData = {
        lat: ctx.message.location.latitude,
        lon: ctx.message.location.longitude,
        username: ctx.message.from.username,
      };
      try {
        updateLocation(userData.username, userData.lat, userData.lon);
        await respondLocation(ctx);
      } catch (err) {
        logger.error(err);
      }
    }
  }
  @Hears('/location')
  async getLocation(@Ctx() ctx: Context) {
    const chatId = ctx.message.chat.id;
    const msg = ctx.message;
    try {
      await requestLocation(ctx);
    } catch (err) {
      logger.error(err);
    }
  }
  @Help()
  async help(@Ctx() ctx: Context) {
    const chatId = ctx.message.chat.id;
    handlersBot.handleHelp(chatId, ctx);
  }
  @Hears('/sub')
  async sub(@Ctx() ctx: Context) {
    const chatId = ctx.message.chat.id;

    isSubscribingMap = await handlersBot.handleSub(
      chatId,
      ctx,
      isSubscribingMap,
    );
  }
  @Hears('/unsub')
  async unsub(@Ctx() ctx: Context) {
    const chatId = ctx.message.chat.id;
    isSubscribingMap = await handlersBot.handleUnsub(
      chatId,
      ctx,
      isSubscribingMap,
      ctx.message.from.username,
    );
  }

  @Hears(timeRegex)
  async setTime(@Ctx() ctx: Context) {
    const chatId = ctx.message.chat.id;
    if (ctx.has(message('text'))) {
      const [hour, minute] = ctx.message.text.split(':');
      const msg = ctx.message;
      handlersBot.handleSubscriptionMessages({
        isSubscribingMap,
        chatId,
        msg,
        hour,
        minute,
        ctx,
        userData,
      });
    }
  }
}
