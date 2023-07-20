import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { VoteResolver } from './vote.resolvers';

@Module({
  controllers: [VoteController],
  providers: [VoteService, VoteResolver],
})
export class VoteModule {}
