import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductListTableComponent } from '../product-list-table/product-list-table.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-qr-content-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-qr-content-modal.component.html',
  styleUrl: './add-qr-content-modal.component.css'
})
export class AddQrContentModalComponent implements OnInit{
  productList:any[]=[];
  constructor(private router: Router,private dialogRef: MatDialogRef<ProductListTableComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}
  ngOnInit(): void {
    console.log("data add content",this.data);
    
  }
  addProduct(): void {
    this.dialogRef.close();
    this.router.navigate(['/edit'])
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
    this.dialogRef.close();
  }
}
