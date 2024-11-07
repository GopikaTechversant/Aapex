import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-print-download-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './print-download-modal.component.html',
  styleUrls: ['./print-download-modal.component.css'],
})
export class PrintDownloadModalComponent implements OnInit {
  @Output() processingStatusChange = new EventEmitter<{ productId: number; isProcessing: boolean }>();
  selectedFormat: string = '';
  selectedType: string = '';
  type: string = '';
  id: any;
  constructor(
    private apiService: ApiServiceService,
    private dialogRef: MatDialogRef<PrintDownloadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.selectedType = this.data.selectedType;
    if (this.selectedType === 'print') {
      this.selectedFormat = 'TWOX2_FORMAT';
    } else if (this.selectedType === 'download') {
      this.selectedFormat = 'svg'; 
    }
  }

  onSubmit(): void {
    let productIds = this.data.id; 
    this.processingStatusChange.emit({ productId: productIds, isProcessing: true })

  if (!Array.isArray(productIds)) {
    productIds = [productIds];
  }

  const data = {
    productIds: productIds 
  };
 
    const format = this.selectedType === 'download' ? 'TWOX2_FORMAT' : this.selectedFormat;
    const type = this.selectedType === 'download' ? this.selectedFormat : 'PDF';

    this.apiService.post(
      `/v1/exhibitor/print-product-sticker?loc_id=1&format=${format}&type=${type.toUpperCase()}&is_expo=1&show_code=C`,
      data
    ).subscribe({
      next: (res: any) => {
        const qrCodeUrl = res?.sStickerPdf;
        if (this.selectedType === 'download' && qrCodeUrl) {
          this.downloadFileDirectly(qrCodeUrl, type);
        } else if (this.selectedType === 'print' && res?.sStickerPdf) {
          window.open(res.sStickerPdf, '_blank');
        }
      },
      error: () => {
      },
      complete: () => {
        this.dialogRef.close();
        this.processingStatusChange.emit({ productId:productIds, isProcessing: false });
      },
    });
  }

  async downloadFileDirectly(url: string, type: string): Promise<void> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = type === 'svg' ? 'qrcode.svg' : 'qrcode.jpeg';
      document.body.appendChild(link);
      link.click();

      
      URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
