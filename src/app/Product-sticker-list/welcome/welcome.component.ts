import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseQRComponent } from '../../purchase-qr/purchase-qr.component';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})

export class WelcomeComponent implements OnInit{
  @Input() stickerCount:number = 0;
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    
  }
  qrCount = 4;
  purchaseQR() {
    const dialogRef = this.dialog.open(PurchaseQRComponent, {
      width: '450px',
      height: '350px',
      panelClass: 'custom-dialog'
    });
  }
}
