const requestHandlers = require('./requestHandlers');
import { AppService } from './app.service';

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
export class AppResolver {
  constructor(private appService: AppService) {}

  //login
  @Mutation((returns) => String)
  async login(@Context() context: any): Promise<string> {
    const result = this.appService.login(context.req);
    return result;
  }
}
