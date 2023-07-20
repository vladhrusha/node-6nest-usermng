import { LoginService } from './login.service';

import { Resolver, Mutation, Context, Query } from '@nestjs/graphql';
@Resolver()
export class LoginResolver {
  constructor(private loginService: LoginService) {}
  //root
  @Query(() => String)
  sayHello2(): string {
    return 'Hello World!';
  }
  //login
  @Mutation(() => String)
  async login(@Context() context: any): Promise<string> {
    const result = this.loginService.login(context.req);
    return result;
  }
}
