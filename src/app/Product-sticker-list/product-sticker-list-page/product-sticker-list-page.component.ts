import { Component, contentChild, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Base/header/header.component';
import { FooterComponent } from '../../Base/footer/footer.component';
import { LeftSidebarComponent } from '../../Base/left-sidebar/left-sidebar.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ProductListTableComponent } from '../product-list-table/product-list-table.component';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-product-sticker-list-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,LeftSidebarComponent,WelcomeComponent,ProductListTableComponent],
  templateUrl: './product-sticker-list-page.component.html',
  styleUrl: './product-sticker-list-page.component.css'
})
export class ProductStickerListPageComponent implements OnInit{
  stickerCount: number = 0;
  products_list: any[] = [
  ]
  constructor(private apiService: ApiServiceService){}
  ngOnInit(): void {
    this.fetchProducts();
    this.fetchStickerCount();
  }

  fetchProducts():void{
    this.apiService.get(`/v1/exhibitor/products?offset=1&pageCount=15&sortkey=1&sortvalue=ps.sCreatedDateTime&iStickerSetId=0&iAssignedFilter=2`).subscribe((res: any) => {
      this.products_list = res?.productStickerBos;
      console.log("bbbbbbbb", res);
    })
  }

  fetchStickerCount():void{
    this.apiService.get(`/v1/exhibitor/sticker/count?name=&setId=0`).subscribe((res:any) => {
      console.log("sticker",res.lPurchasedStickerCount);
      this.stickerCount = res.lPurchasedStickerCount || 0;
      this.products_list = this.products_list.slice(0, this.stickerCount);
    })
  }
}
