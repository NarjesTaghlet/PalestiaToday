import {IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min} from "class-validator";
import {errorMessages} from "../../generics/error_messages";
import {ReactionType} from "../../enums/reaction-type";
import {User} from "../../user/entities/user.entity";
import {Article} from "../../article/entities/article.entity";

export class CreateInteractionarticleDto {
    @IsOptional()
    @IsString()
    commentaire: string;

    @IsOptional()
    @IsEnum(ReactionType)
    reaction: ReactionType;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(10)
    note: number;

    article_id: number;

    user_id: number;
}
