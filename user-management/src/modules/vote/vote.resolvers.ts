const requestHandlers = require('./requestHandlers');
import { HttpStatus, HttpCode } from '@nestjs/common';
import { PostVoteDto } from './vote.dto';
import { VoteService } from './vote.service';
const Vote = require('./vote.model');

import {
  GraphQLModule,
  Resolver,
  Query,
  Args,
  ObjectType,
  Field,
  Mutation,
  Context,
} from '@nestjs/graphql';
@Resolver()
export class VoteResolver {
  constructor(private voteService: VoteService) {}

  //vote
  @HttpCode(HttpStatus.CREATED)
  @Mutation((returns) => String)
  async vote(
    @Context() context: any,
    @Args('input') input: PostVoteDto,
  ): Promise<string> {
    const result = await requestHandlers.handleVote(context.req, input);
    return result;
  }
}
