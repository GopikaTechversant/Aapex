import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDownloadModalComponent } from './print-download-modal.component';

describe('PrintDownloadModalComponent', () => {
  let component: PrintDownloadModalComponent;
  let fixture: ComponentFixture<PrintDownloadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintDownloadModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintDownloadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
