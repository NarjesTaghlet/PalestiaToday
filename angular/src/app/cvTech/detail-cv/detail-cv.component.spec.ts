import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultImagePipe } from '../../pipes/default-image.pipe';
import { DetailCvComponent } from './detail-cv.component';

describe('DetailCvComponent', () => {
  let component: DetailCvComponent;
  let fixture: ComponentFixture<DetailCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
