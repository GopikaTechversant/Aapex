import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrintDownloadModalComponent } from '../print-download-modal/print-download-modal.component';
@Component({
  selector: 'app-product-list-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-table.component.html',
  styleUrl: './product-list-table.component.css'
})
export class ProductListTableComponent implements OnInit{
 
  products_list:any[] = [
    {
      name: 'test product copy',
      code: 'XQNF-08-055-23',
      // image: 'assets/images/product1.png',
      // qrCode: 'assets/images/qr1.png',
      lastUpdated: 'Oct 14, 2024',
      total_images:2,
      total_videos:3,
      total_files:0
    }
  ]
  constructor(private dialog: MatDialog){}
  ngOnInit(): void {
    
  }

  printDownloadProductModal():void{
    const dialogRef = this.dialog.open(PrintDownloadModalComponent, {
      width: '500px',
      height: '170px',
    });
  }

  editProduct():void{

  }
  

}
