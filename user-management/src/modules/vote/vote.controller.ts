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
  //vote
  @Post(`${appName}/${appVersion}/vote`)
  @HttpCode(HttpStatus.CREATED)
  async vote(
    @Req() req,
    @Body(new ValidationPipe()) postVoteDto: PostVoteDto,
  ): Promise<string> {
    const result = await this.voteService.vote(req);
    return await postVoteErrorResponse(result);
  }
}
