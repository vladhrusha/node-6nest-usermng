import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import * as dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
dotenv.config();
@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.SUBSCRIPTIONBOT_TOKEN,
    }),
  ],
  providers: [BotService, Telegraf],
})
export class BotModule {}
