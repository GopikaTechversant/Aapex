import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrintDownloadModalComponent } from '../print-download-modal/print-download-modal.component';
import { AddQrContentModalComponent } from '../add-qr-content-modal/add-qr-content-modal.component';
import { ApiServiceService } from '../../services/api-service.service';
@Component({
  selector: 'app-product-list-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-table.component.html',
  styleUrl: './product-list-table.component.css'
})
export class ProductListTableComponent implements OnInit {

  products_list: any[] = [
    {
      name: 'test product copy',
      code: 'XQNF-08-055-23',
      product_image: 'assets/images/product1.png',
      // qrCode: 'assets/images/qr1.png',
      lastUpdated: 'Oct 14, 2024',
      total_images: 2,
      total_videos: 3,
      total_files: 0
    },
    {
      name: '',
      code: '',
      product_image: '',
      // qrCode: 'assets/images/qr1.png',
      lastUpdated: 'Oct 14, 2024',
    },
    {
      name: 'test product copy',
      code: 'XQNF-08-055-23',
      product_image: 'assets/images/product1.png',
      // qrCode: 'assets/images/qr1.png',
      lastUpdated: 'Oct 14, 2024',
      total_images: 0,
      total_videos: 0,
      total_files: 0
    }

  ]
  constructor(private dialog: MatDialog, private apiService: ApiServiceService) { }
  ngOnInit(): void {
    this.apiService.get(`/v1/exhibitor/products?offset=1&pageCount=15&sortkey=1&sortvalue=ps.sCreatedDateTime&iStickerSetId=0&iAssignedFilter=2`).subscribe((res: any) => {
      console.log("tresponse", res);

    })
  }

  printDownloadProductModal(selectedType: any): void {
    const dialogRef = this.dialog.open(PrintDownloadModalComponent, {
      width: '500px',
      height: '200px',
      data: selectedType
    });
  }

  editProduct(): void {

  }

  addQrContentModal(): void {
    const dialogRef = this.dialog.open(AddQrContentModalComponent, {
      width: '420px',
      height: '110px'
    })
  }

}
