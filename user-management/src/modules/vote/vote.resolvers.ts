const requestHandlers = require('./requestHandlers');
import { HttpStatus, HttpCode } from '@nestjs/common';
import { PostVoteDto } from './vote.dto';
import { VoteService } from './vote.service';
import { PostVoteInput, PostVote } from './vote.model';

import {
  Resolver,
  Args,
  Mutation,
  Context,
  Query,
  ObjectType,
  Field,
  Int,
} from '@nestjs/graphql';

@ObjectType()
export class Vote {
  @Field((type) => String)
  result: string;
}

@Resolver((of) => Vote)
export class VoteResolver {
  constructor(private voteService: VoteService) {}

  //root
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
  //vote
  @Mutation((returns) => String)
  async vote(
    @Context() context: any,
    @Args('input') input: PostVoteInput,
  ): Promise<string> {
    const result = await requestHandlers.handleVote(context.req, input);
    return result;
  }
}
