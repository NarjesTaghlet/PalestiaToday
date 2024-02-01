import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalestineMapComponent } from './palestine-map.component';

describe('PalestineMapComponent', () => {
  let component: PalestineMapComponent;
  let fixture: ComponentFixture<PalestineMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PalestineMapComponent]
    });
    fixture = TestBed.createComponent(PalestineMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
