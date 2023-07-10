import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './modules/bot/bot.module';

@Module({
  imports: [BotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
