import { Controller } from '@nestjs/common';

import { VoteService } from './vote.service';

@Controller()
export class VoteController {
  constructor(private readonly voteService: VoteService) {}
}
