import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrintDownloadModalComponent } from '../print-download-modal/print-download-modal.component';
import { AddQrContentModalComponent } from '../add-qr-content-modal/add-qr-content-modal.component';
import { ApiServiceService } from '../../services/api-service.service';
import { DatePipe } from '@angular/common';
import { log } from 'console';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list-table',
  standalone: true,
  imports: [CommonModule,DatePipe],
  providers: [DatePipe],
  templateUrl: './product-list-table.component.html',
  styleUrl: './product-list-table.component.css'
})
export class ProductListTableComponent implements OnInit {
  @Input() stickerCount: number = 0;
  @Input() products_list: any[] = [];
  processingStatus: { [productId: number]: string | null } = {};
  constructor(private dialog: MatDialog, private apiService: ApiServiceService,private datePipe: DatePipe,private router: Router) { }
  ngOnInit(): void {
    
  }

  printDownloadProductModal(selectedType: any,id:any): void {
    const dialogRef = this.dialog.open(PrintDownloadModalComponent, {
      width: '500px',
      height: '200px',
      data: { selectedType, id }
    });
      dialogRef.componentInstance.processingStatusChange.subscribe((isProcessing: boolean) => {
        this.processingStatus[id] = isProcessing ? selectedType : null;
      });
      dialogRef.afterClosed().subscribe(() => {
        this.processingStatus[id] = null; 
      });
    }
  

  editProduct(id: number, index: number): void {
    // Use router to navigate with parameters
    this.router.navigate(['/edit'], {
      queryParams: {
        id: id,
        p: 2,
        editEnable: 0,
        index: index,
        addContent: 0
      }
    });
  }


  addQrContentModal(): void {
    const dialogRef = this.dialog.open(AddQrContentModalComponent, {
      width: '420px',
      height: '110px'
    })
  }

  formatDate(date: string | null): string {
    return this.datePipe.transform(date, 'MMM d, y') || ''; 
  }

  get rows() {
    return Array.from({ length: this.stickerCount }, (_, i) => i + 1);
  }

  get hasEnoughProducts(): boolean {
    return this.products_list.length >= this.stickerCount;
  }
}
