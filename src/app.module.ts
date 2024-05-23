import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { MyExceptionFilter, ValidationPipe } from '@utils';
import { NumerologyModule } from './numerology/numerology.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, NumerologyModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {}
