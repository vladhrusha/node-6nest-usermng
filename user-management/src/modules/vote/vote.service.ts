import { Injectable } from '@nestjs/common';
const requestHandlers = require('./requestHandlers');
const Vote = require('./vote.model');

@Injectable()
export class VoteService {
  constructor() {}
  //vote
  async vote(req): Promise<typeof Vote> {
    const result = await requestHandlers.handleVote(req);
    return result;
  }
}
