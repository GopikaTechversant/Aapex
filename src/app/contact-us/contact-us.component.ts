import { Component } from '@angular/core';
import { HeaderComponent} from '../Base/header/header.component';
import { ApiServiceService } from '../services/api-service.service';
@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  products_list:any[]=[];
  stickerCount:number=0;
  constructor (private apiService: ApiServiceService){}
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
