import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQRComponent } from './purchase-qr.component';

describe('PurchaseQRComponent', () => {
  let component: PurchaseQRComponent;
  let fixture: ComponentFixture<PurchaseQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseQRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
