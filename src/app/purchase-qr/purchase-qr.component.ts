import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-qr',
  standalone: true,
  imports: [],
  templateUrl: './purchase-qr.component.html',
  styleUrl: './purchase-qr.component.css'
})
export class PurchaseQRComponent {
  constructor(private dialog: MatDialog,private dialogRef: MatDialogRef<PurchaseQRComponent>) {}
  closePurchaseQR() {
    this.dialogRef.close();
  }
}
