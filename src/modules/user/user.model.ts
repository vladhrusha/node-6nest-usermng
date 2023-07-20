import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class PostUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Nickname is required' })
  nickname: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstname?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  lastname?: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

@InputType()
export class DeleteUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Nickname parameter is required' })
  nickname: string;
}

@InputType()
export class GetUsersInput {
  @Field()
  @IsInt({ message: 'Page must be an integer' })
  page: number;

  @Field()
  @IsInt({ message: 'Limit must be an integer' })
  limit: number;
}

@InputType()
export class GetUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Nickname parameter is required' })
  nickname: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Nickname is required' })
  nickname: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  lastname?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstname?: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'New password is required' })
  newPassword: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'ifUnmodifiedSince is missing' })
  ifUnmodifiedSince: string;
}
