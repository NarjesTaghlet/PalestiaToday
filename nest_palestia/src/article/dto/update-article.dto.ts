import { PartialType } from '@nestjs/mapped-types';
import { AddArticleDto } from './add-article.dto';
import {IsString} from "class-validator";

export class UpdateArticleDto extends PartialType(AddArticleDto) {
    @IsString()
    title : string

    @IsString()
    description : string

}
