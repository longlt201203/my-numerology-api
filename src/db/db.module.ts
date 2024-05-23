import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Env } from '@utils';

@Module({
    imports: [MongooseModule.forRoot(Env.DB_URI, { user: Env.DB_USER, pass: Env.DB_PASS, dbName: Env.DB_NAME, autoCreate: true })]
})
export class DbModule {}
