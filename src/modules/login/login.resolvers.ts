import { LoginService } from './login.service';

import { Resolver, Mutation, Context, Query } from '@nestjs/graphql';
@Resolver()
export class LoginResolver {
  constructor(private loginService: LoginService) {}
  //root query placeholder, to avoid empty root query error
  @Query(() => String)
  loginQueryPlaceholder(): string {
    return 'placeholder';
  }
  //login
  @Mutation(() => String)
  async login(@Context() context: any): Promise<string> {
    const result = this.loginService.login(context.req);
    return result;
  }
}
