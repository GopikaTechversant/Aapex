import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgClass } from '@angular/common';
import { PrintDownloadModalComponent } from '../../Product-sticker-list/print-download-modal/print-download-modal.component';
@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [NgClass,PrintDownloadModalComponent],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
  animations: [
    trigger('slideInFromLeft', [
      state('void', style({ transform: 'translateX(-100%)' })),
      state('*', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class LeftSidebarComponent {

  selectedItem: string = 'dashboard';
  constructor(private dialogRef: MatDialogRef<LeftSidebarComponent>,private dialog: MatDialog) {}
  selectItem(item: string) {
    this.selectedItem = item;
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
