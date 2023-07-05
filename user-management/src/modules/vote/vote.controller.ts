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
} from '@nestjs/common';
import { VoteDto } from '../../utils/requestValidations/voteDto';

import { VoteService } from './vote.service';
import * as dotenv from 'dotenv';
dotenv.config();
const appName = 'task6';
const appVersion = process.env.APP_VERSION;
@Controller()
export class VoteController {
  constructor(private readonly voteService: VoteService) {}
  //vote
  @Post(`${appName}/${appVersion}/vote`)
  async vote(@Req() req, @Body(new ValidationPipe()) voteDto: VoteDto) {
    const result = await this.voteService.vote(req);
    return { message: result };
  }
}
