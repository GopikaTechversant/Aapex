import { Component, contentChild, OnInit, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from '../../Base/header/header.component';
import { FooterComponent } from '../../Base/footer/footer.component';
import { LeftSidebarComponent } from '../../Base/left-sidebar/left-sidebar.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ProductListTableComponent } from '../product-list-table/product-list-table.component';
import { ApiServiceService } from '../../services/api-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
@Component({
  selector: 'app-product-sticker-list-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,WelcomeComponent,ProductListTableComponent],
  templateUrl: './product-sticker-list-page.component.html',
  styleUrl: './product-sticker-list-page.component.css'
})
export class ProductStickerListPageComponent implements OnInit{
  stickerCount: number = 0;
  products_list : WritableSignal<any[]> = signal([]);
  userRole: any;
  constructor(private apiService: ApiServiceService,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.fetchProducts();
    // this.route.queryParams.subscribe((params:any) => {
    //   this.userRole = params['role'] || 'Guest'; 
    //   console.log('User Role:', this.userRole);
    // });
     this.userRole = this.apiService.getUserRole();
  }

  fetchProducts():void{
    this.apiService.get(`/v1/exhibitor/products?offset=1&pageCount=15&sortkey=1&sortvalue=ps.sCreatedDateTime&iStickerSetId=0&iAssignedFilter=2`).subscribe((res: any) => {
      const products = res?.productStickerBos
      this.products_list.set(products); 
        this.fetchStickerCount(); 
    })
  }

  fetchStickerCount(): void {
    this.apiService.get(`/v1/exhibitor/sticker/count?name=&setId=0`)
      .subscribe((res: any) => {
        this.stickerCount = res.lPurchasedStickerCount || 0;
        const updatedList = this.products_list().slice(0, this.stickerCount);  
        this.products_list.set(updatedList);  
      });
  }

  refreshData(): void {
    this.fetchProducts();
  }
}
