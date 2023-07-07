import { Param } from '@nestjs/common';
import { IsInt, IsIn, IsString, IsNotEmpty, IsOptional } from 'class-validator';

// post user
export class PostUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Nickname is required' })
  nickname: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
// delete user
export class DeleteUserDto {
  @IsString()
  @IsNotEmpty({ message: 'nickname parameter is required' })
  nickname: string;
}
// get users
export class GetUsersDto {
  @IsInt({ message: 'Page must be an integer' })
  page: number;

  @IsInt({ message: 'Limit must be an integer' })
  limit: number;
}
// get user
export class GetUserDto {
  @IsString()
  @IsNotEmpty({ message: 'nickname parameter is required' })
  nickname: string;
}

//put user
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Nickname is required' })
  nickname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'New password is required' })
  newPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'ifUnmodifiedSince is missing' })
  ifUnmodifiedSince: string;
}
