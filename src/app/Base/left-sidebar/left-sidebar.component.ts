import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [NgClass],
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
  constructor(private dialogRef: MatDialogRef<LeftSidebarComponent>) {}
  selectItem(item: string) {
    this.selectedItem = item;
}
  closeDialog() {
    this.dialogRef.close();
  }
}
