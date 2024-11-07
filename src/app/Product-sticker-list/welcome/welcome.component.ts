import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseQRComponent } from '../../purchase-qr/purchase-qr.component';
import { ColorStateService } from '../../services/color-state.service';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})

export class WelcomeComponent implements OnInit{
  @Input() stickerCount:number = 0;
  constructor(private colorStateService: ColorStateService,private dialog: MatDialog) {}
  ngOnInit(): void {
    
  }
  get buttonColor(): string {
    return this.colorStateService.buttonColor();
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
