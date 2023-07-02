import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const secret = process.env.TOKEN_SECRET;

interface CustomRequest extends Request {
  user?: any;
}

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
}
