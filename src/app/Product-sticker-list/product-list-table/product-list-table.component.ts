import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-list-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-table.component.html',
  styleUrl: './product-list-table.component.css'
})
export class ProductListTableComponent implements OnInit{
 
  products_list:any[] = [
    {
      name: 'test product copy',
      code: 'XQNF-08-055-23',
      // image: 'assets/images/product1.png',
      // qrCode: 'assets/images/qr1.png',
      lastUpdated: 'Oct 14, 2024',
      total_images:2,
      total_videos:3,
      total_files:0
    }
  ]
  constructor(){}
  ngOnInit(): void {
    
  }

}
