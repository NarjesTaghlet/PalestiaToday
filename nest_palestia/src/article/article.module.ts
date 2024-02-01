import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import {Article} from "./entities/article.entity";
import {TypeOrmModule} from "@nestjs/typeorm" ;
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {Interactionarticle} from "../interactionarticle/entities/interactionarticle.entity";
@Module({
  imports :[TypeOrmModule.forFeature([Article,Interactionarticle])],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
