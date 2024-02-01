import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpComponent } from './http.component';

describe('HttpComponent', () => {
  let component: HttpComponent;
  let fixture: ComponentFixture<HttpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpComponent]
    });
    fixture = TestBed.createComponent(HttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
