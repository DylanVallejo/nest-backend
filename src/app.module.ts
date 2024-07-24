import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { env } from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),// conexion hacia mongodb
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){
    console.log(process.env)
  }
  
}
