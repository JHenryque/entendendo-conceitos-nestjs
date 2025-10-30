import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { TesksModule } from './tesks/tesks.module';

@Module({
  imports: [UsersModule, TesksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
