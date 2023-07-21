const requestHandlers = require('./requestHandlers');
import { UseGuards } from '@nestjs/common';
import { VoteService } from './vote.service';
import { PostVoteInput } from './vote.model';
import { AuthGuard } from '../../authenticate.middleware';

import {
  Resolver,
  Args,
  Mutation,
  Context,
  Query,
  ObjectType,
  Field,
} from '@nestjs/graphql';

@ObjectType()
export class Vote {
  @Field(() => String)
  result: string;
}

@Resolver(() => Vote)
export class VoteResolver {
  constructor(private voteService: VoteService) {}

  //root query placeholder, to avoid empty root query error
  @Query(() => String)
  voteQueryPlaceholder(): string {
    return 'placeholder';
  }
  //vote
  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async vote(
    @Context() context: any,
    @Args('input') input: PostVoteInput,
  ): Promise<string> {
    const result = await requestHandlers.handleVote(context.req, input);
    return result;
  }
}
