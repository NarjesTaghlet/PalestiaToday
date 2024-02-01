import { PartialType } from '@nestjs/mapped-types';
import { CreateInteractionarticleDto } from './create-interactionarticle.dto';

export class UpdateInteractionarticleDto extends PartialType(CreateInteractionarticleDto) {}
