import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Req,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { AppService } from './app.service';
import * as dotenv from 'dotenv';
dotenv.config();
const appName = 'task6';
const appVersion = process.env.APP_VERSION;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
