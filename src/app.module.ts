import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthAdminGuard } from './common/guards/admin.guard';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './app/test/test.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    UsersModule,
    AuthModule,
    TestModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'files'),
      serveRoot: '/files',
    }),
  ],
  controllers: [AppController, TasksController, UsersController],
  providers: [
    AppService,

    // {
    //   provide: APP_GUARD,
    //   useClass: AuthAdminGuard,
    // },
    // {
    //   provide: 'KEY_TOKEN',
    //   useValue: 'Tokem_125',
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    // ou .forRoutes(''users', ou 'tasks');
  }
}
