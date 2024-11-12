import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrintDownloadModalComponent } from '../print-download-modal/print-download-modal.component';
import { AddQrContentModalComponent } from '../add-qr-content-modal/add-qr-content-modal.component';
import { ApiServiceService } from '../../services/api-service.service';
import { DatePipe } from '@angular/common';
import { log } from 'console';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorStateService } from '../../services/color-state.service';
@Component({
  selector: 'app-product-list-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './product-list-table.component.html',
  styleUrl: './product-list-table.component.css'
})
export class ProductListTableComponent implements OnInit {
  @Input() stickerCount: number = 0;
  @Input() products_list: any[] = [];
  @Input() userRole: any;
  processingStatus: { [productId: number]: string | null } = {};
  isAllChecked: boolean = false;
  isNps: number = 0;
  isNpsChecked: boolean = false;
  constructor(private colorStateService: ColorStateService, private dialog: MatDialog, private apiService: ApiServiceService, private datePipe: DatePipe, private router: Router) { }
  ngOnInit(): void {
    this.products_list.forEach((data: any) => {
      data.isNpsChecked = data.iIsCompany === 0 && data.iIsNps === 1;
    })
  }

  toggleAllCheckboxes(checked: boolean) {
    this.isAllChecked = checked;
    this.products_list.forEach((product, index) => {
      product.isChecked = checked;
    });
    this.updateButtonColor();
  }
  updateButtonColor() {
    const anyChecked = this.products_list.some(product => product.isChecked);
    this.colorStateService.buttonColor.set(anyChecked ? '#476df8' : '#d1d5db');
  }
  onIndividualCheckboxChange() {
    this.isAllChecked = this.products_list.every(product => product.isChecked);
    this.updateButtonColor();
  }
  printDownloadProductModal(selectedType: any, id: any): void {
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

  onCheckboxChange(product: any): void {
    console.log("product.createdUserId",product);
    
    const payload = {
      iUserId: product.thumbnail?.createdUser?.iId
    };
    if (product.isNpsChecked) {
      this.isNps = 1;
    } else this.isNps = 0;
    this.apiService.post(`/v1/exhibitor/add-nps?productId=${product.iId}&isNps=${this.isNps}`, payload).subscribe(
      (res: any) => {
        console.log("API response:", payload);
      }
    );
  }

}
