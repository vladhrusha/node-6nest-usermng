import { IsInt, IsIn, IsString } from 'class-validator';

export class PostVoteDto {
  @IsInt({ message: 'Vote value must be an integer' })
  @IsIn([-1, 0, 1], { message: 'Vote value should be either -1, 0, or 1' })
  value: number;

  @IsString({ message: 'Destination nickname is required' })
  destNickname: string;
}
