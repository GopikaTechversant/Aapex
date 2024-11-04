import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrintDownloadModalComponent } from '../print-download-modal/print-download-modal.component';
import { AddQrContentModalComponent } from '../add-qr-content-modal/add-qr-content-modal.component';
import { ApiServiceService } from '../../services/api-service.service';
import { DatePipe } from '@angular/common';
import { log } from 'console';
@Component({
  selector: 'app-product-list-table',
  standalone: true,
  imports: [CommonModule,DatePipe],
  providers: [DatePipe],
  templateUrl: './product-list-table.component.html',
  styleUrl: './product-list-table.component.css'
})
export class ProductListTableComponent implements OnInit {
  stickerCount: number = 0;
  @Input() products_list: any[] = [];
  constructor(private dialog: MatDialog, private apiService: ApiServiceService,private datePipe: DatePipe) { }
  ngOnInit(): void {
    
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

  formatDate(date: string | null): string {
    return this.datePipe.transform(date, 'MMM d, y') || ''; // Format to 'Oct 11, 2024'
  }
}
