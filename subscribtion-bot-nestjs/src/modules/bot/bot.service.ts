import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class BotService {
  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Welcome');
  }
  @On('sticker')
  async onSticker(ctx: Context) {
    await ctx.reply('👍');
  }
}
