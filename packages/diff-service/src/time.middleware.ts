import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class TimeMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    const start = Date.now();
    await next();
    Logger.log(`${req.url} costs ${Date.now() - start}`);
  }
}
