import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolvers';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import {
  GraphQLModule,
  Resolver,
  Query,
  Args,
  ObjectType,
  Field,
  Mutation,
} from '@nestjs/graphql';
import { PostUserDto } from './user.dto';
import { join } from 'path';

@Module({
  // imports: [
  //   GraphQLModule.forRoot<ApolloDriverConfig>({
  //     driver: ApolloDriver,
  //     path: '/graphql',
  //     include: [UserModule],
  //     sortSchema: true,
  //     autoSchemaFile: join(process.cwd(), 'src/modules/user/user.gql'),
  //   }),
  // ],
  providers: [UserService, UserResolver],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
