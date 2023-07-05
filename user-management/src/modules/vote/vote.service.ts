import { Injectable } from '@nestjs/common';
const requestHandlers = require('./requestHandlers');

@Injectable()
export class VoteService {
  constructor() {}
  //vote
  async vote(req) {
    const result = await requestHandlers.handleVote(req);
    return result;
  }
}
