import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //console.log('Request...');

    const authorization = req.headers.authorization;

    if (authorization) {
      req['user'] = {
        token: authorization,
        name: 'Teste',
        role: 'admin',
      };
      if (authorization === '123456') {
        console.log('Token válido');
        return next();
      }
      res.status(401).json({ message: 'Token inválido' });
    }

    next();
  }
}
