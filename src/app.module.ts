import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MyExceptionFilter, NumerologyClsStore, ValidationPipe } from '@utils';
import { DbModule } from './db/db.module';
import { NumerologyModule } from '@modules/numerology';
import { AuthModule } from '@modules/auth';
import { AuthGuard } from '@modules/auth/auth.guard';
import { CryptoModule } from '@modules/crypto';
import { AccountsModule } from '@modules/accounts';
import { ClsModule, ClsService } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls: ClsService<NumerologyClsStore>, req) => {
          cls.set("profile", null);
        }
      }
    }),
    DbModule,
    AuthModule,
    NumerologyModule,
    CryptoModule,
    AccountsModule
  ],
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
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
