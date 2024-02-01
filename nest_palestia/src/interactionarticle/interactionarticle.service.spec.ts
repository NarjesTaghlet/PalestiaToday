import { Test, TestingModule } from '@nestjs/testing';
import { InteractionarticleService } from './interactionarticle.service';

describe('InteractionarticleService', () => {
  let service: InteractionarticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InteractionarticleService],
    }).compile();

    service = module.get<InteractionarticleService>(InteractionarticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
