import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStickerListPageComponent } from './product-sticker-list-page.component';

describe('ProductStickerListPageComponent', () => {
  let component: ProductStickerListPageComponent;
  let fixture: ComponentFixture<ProductStickerListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStickerListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductStickerListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
