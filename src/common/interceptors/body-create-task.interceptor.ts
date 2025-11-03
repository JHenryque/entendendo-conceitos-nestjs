import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class BodyCreateTaskInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const resquest = context.switchToHttp().getRequest();
    const { method, url, body } = resquest;

    console.log(`[REQUEST] ${method} ${url} - Inicio da req`);
    console.log(`[BODY] ${JSON.stringify(body, null, 2)}`);

    return next.handle();
  }
}
