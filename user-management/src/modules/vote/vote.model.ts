import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';

@InputType()
export class PostVoteInput {
  @Field(() => Int, { description: 'Vote value must be an integer' })
  @IsIn([-1, 0, 1], { message: 'Vote value should be either -1, 0, or 1' })
  value: number;

  @Field({ description: 'Destination nickname is required' })
  destNickname: string;
}

@ObjectType()
export class PostVote {
  @Field(() => Int, { description: 'Vote value' })
  value: number;

  @Field({ description: 'Destination nickname' })
  destNickname: string;
}
