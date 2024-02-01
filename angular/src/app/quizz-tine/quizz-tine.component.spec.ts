import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzTineComponent } from './quizz-tine.component';

describe('QuizzTineComponent', () => {
  let component: QuizzTineComponent;
  let fixture: ComponentFixture<QuizzTineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzTineComponent]
    });
    fixture = TestBed.createComponent(QuizzTineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
