import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgClass } from '@angular/common';
import { PrintDownloadModalComponent } from '../../Product-sticker-list/print-download-modal/print-download-modal.component';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [NgClass,PrintDownloadModalComponent],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'], 
 
})
export class LeftSidebarComponent {
  selectedItem: string = 'dashboard';
  constructor(private dialogRef: MatDialogRef<LeftSidebarComponent>,private dialog: MatDialog,private router: Router) {this.updateSelectedItem()}

private updateSelectedItem() {
  const currentRoute = this.router.url; 
  if (currentRoute.includes('contactUs')) {
    this.selectedItem = 'contactUs';
  } else if (currentRoute.includes('productList')) {
    this.selectedItem = 'productList';
  } else if (currentRoute.includes('printAll')) {
    this.selectedItem = 'printAll';
  } else {
    this.selectedItem = 'dashboard'; 
  }
}

selectItem(item: string) {
  this.selectedItem = item;
  if (item === 'contactUs') {
    this.router.navigate(['/contactUs']);
  } else if (item === 'productList') {
    this.router.navigate(['/productList']);
  } else if (item === 'printAll') {
    this.printDownloadProductModal('printAll');
  } else {
    this.router.navigate(['/']); 
  }
  this.dialogRef.close();
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
