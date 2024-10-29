import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],  // Corrected from styleUrl to styleUrls
 
})
export class LeftSidebarComponent {
  selectedItem: string = 'dashboard';
  constructor(
    private dialogRef: MatDialogRef<LeftSidebarComponent>,
    private router: Router
  ) {}

  selectItem(item: string) {
    this.selectedItem = item;
    if (item === 'contactUs') {
      this.router.navigate(['/contactUs']);
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
