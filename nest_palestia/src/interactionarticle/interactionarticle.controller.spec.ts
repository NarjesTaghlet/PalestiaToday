import { Test, TestingModule } from '@nestjs/testing';
import { InteractionarticleController } from './interactionarticle.controller';
import { InteractionarticleService } from './interactionarticle.service';

describe('InteractionarticleController', () => {
  let controller: InteractionarticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InteractionarticleController],
      providers: [InteractionarticleService],
    }).compile();

    controller = module.get<InteractionarticleController>(InteractionarticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
