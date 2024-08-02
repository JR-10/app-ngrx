import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPhotosComponent } from './modal-photos.component';

describe('ModalPhotosComponent', () => {
  let component: ModalPhotosComponent;
  let fixture: ComponentFixture<ModalPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPhotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
