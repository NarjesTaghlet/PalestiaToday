import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniWordComponent } from './mini-word.component';

describe('MiniWordComponent', () => {
  let component: MiniWordComponent;
  let fixture: ComponentFixture<MiniWordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniWordComponent]
    });
    fixture = TestBed.createComponent(MiniWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
