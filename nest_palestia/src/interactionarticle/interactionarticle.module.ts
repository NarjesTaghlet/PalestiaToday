import { Module } from '@nestjs/common';
import { InteractionarticleService } from './interactionarticle.service';
import { InteractionarticleController } from './interactionarticle.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Article} from "../article/entities/article.entity";
import {Interactionarticle} from "./entities/interactionarticle.entity";4
import { ArticleModule } from '../article/article.module';
import { UserModule } from '../user/user.module';

@Module({
  imports :[ArticleModule, UserModule, TypeOrmModule.forFeature([Interactionarticle, Article])],

  controllers: [InteractionarticleController],
  providers: [InteractionarticleService],
})
export class InteractionarticleModule {}