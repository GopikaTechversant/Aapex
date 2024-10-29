import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgClass } from '@angular/common';
import { PrintDownloadModalComponent } from '../../Product-sticker-list/print-download-modal/print-download-modal.component';
import { Router } from '@angular/router'; // Import Router
@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [NgClass,PrintDownloadModalComponent],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],  // Corrected from styleUrl to styleUrls
 
})
export class LeftSidebarComponent {
  selectedItem: string = 'dashboard';
  constructor(private dialogRef: MatDialogRef<LeftSidebarComponent>,private dialog: MatDialog,private router: Router) {}
  selectItem(item: string) {
    this.selectedItem = item;
    if (this.selectedItem === 'contactUs') {
      this.router.navigate(['/contactUs']);
      this.dialogRef.close();
    }else if(this.selectedItem === 'productList'){
      this.router.navigate(['/productStickerList']);
      this.dialogRef.close();
    }
}
printDownloadProductModal(selectedType:any):void{
  const dialogRef = this.dialog.open(PrintDownloadModalComponent, {
    width: '500px',
    height: '200px',
    data:selectedType
  });
}
  closeDialog() {
    this.dialogRef.close();
  }
}
