import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQrContentModalComponent } from './add-qr-content-modal.component';

describe('AddQrContentModalComponent', () => {
  let component: AddQrContentModalComponent;
  let fixture: ComponentFixture<AddQrContentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQrContentModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddQrContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
