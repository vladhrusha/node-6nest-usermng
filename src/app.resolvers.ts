import { AppService } from './app.service';

import { Resolver, Query } from '@nestjs/graphql';
@Resolver()
export class AppResolver {
  constructor(private appService: AppService) {}
  //root
  @Query(() => String)
  sayHelloMain(): string {
    return 'Hello World!';
  }
}
