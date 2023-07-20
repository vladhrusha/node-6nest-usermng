import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

dotenv.config();
const secret = process.env.TOKEN_SECRET;

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext().req;
    const token = req.headers.authorization?.split(' ')[1];
    let isAuthenticated: boolean;
    if (token == null) isAuthenticated = false;

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        isAuthenticated = false;
      } else {
        req.user = decoded;

        isAuthenticated = true;
      }
    });
    return isAuthenticated;
  }
}
