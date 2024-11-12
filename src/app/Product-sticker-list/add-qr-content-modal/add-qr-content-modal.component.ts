import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductListTableComponent } from '../product-list-table/product-list-table.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-qr-content-modal',
  standalone: true,
  imports: [],
  templateUrl: './add-qr-content-modal.component.html',
  styleUrl: './add-qr-content-modal.component.css'
})
export class AddQrContentModalComponent implements OnInit{
  constructor(private router: Router,private dialogRef: MatDialogRef<ProductListTableComponent>){}
  ngOnInit(): void {
    
  }
  editProduct(): void {
    this.dialogRef.close();
    this.router.navigate(['/edit'])
  }
}
