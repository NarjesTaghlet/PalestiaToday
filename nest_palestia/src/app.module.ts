import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Article} from "./article/entities/article.entity";
import {User} from "./user/entities/user.entity";
import { InteractionarticleModule } from './interactionarticle/interactionarticle.module';
import {Interactionarticle} from "./interactionarticle/entities/interactionarticle.entity";
import {ConfigModule} from "@nestjs/config";
import { MailModule } from './mail/mail.module';
import * as dotenv from 'dotenv';
import * as process from "process";

dotenv.config()

@Module({
  imports: [ArticleModule, UserModule
  ,TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) ,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Article,User,Interactionarticle],
      synchronize: true,
    }), InteractionarticleModule,
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
