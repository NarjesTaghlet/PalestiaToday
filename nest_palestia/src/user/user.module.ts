import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {ArticleService} from "../article/article.service";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import * as process from "process";
import {JwtStrategy} from "./stratégie/passport_jwt";
import {ArticleModule} from "../article/article.module";

dotenv.config();

@Module({
  imports :[TypeOrmModule.forFeature([User]),
  PassportModule.register({
    defaultStrategy : 'jwt'
  }), JwtModule.register({
        secret : process.env.SECRET_KEY, signOptions : {
            expiresIn : 3600
      }})
  ,ArticleModule],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports: [UserService],

})
export class UserModule {}
