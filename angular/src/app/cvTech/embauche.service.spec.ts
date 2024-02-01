import { TestBed } from '@angular/core/testing';

import { EmbaucheService } from './embauche.service';

describe('EmbaucheService', () => {
  let service: EmbaucheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmbaucheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
