import {
  Controller,
  Post,
  Req,
  Body,
  ValidationPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PostVoteDto } from './vote.dto';

import { VoteService } from './vote.service';
import * as dotenv from 'dotenv';
dotenv.config();
const appName = 'task6';
const appVersion = process.env.APP_VERSION;
const postVoteErrorResponse = require('./responses/postVoteErrorResponse');
@Controller()
export class VoteController {
  constructor(private readonly voteService: VoteService) {}
}
