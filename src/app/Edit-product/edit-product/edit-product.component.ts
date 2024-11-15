import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FooterComponent } from '../../Base/footer/footer.component';
import { HeaderComponent } from '../../Base/header/header.component';
import { LeftSidebarComponent } from '../../Base/left-sidebar/left-sidebar.component';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';
import { MediaUploadComponent } from '../media-upload/media-upload.component';
import { ApiServiceService } from '../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CompanyDetailComponent, MediaUploadComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  infoTypeSignal: WritableSignal<string> = signal('');
  productDetail:any;
  constructor( private apiService: ApiServiceService,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.fetchCompanyDetails();
  }

  fetchCompanyDetails():void{
    const productId = this.route.snapshot.queryParamMap.get('id');
    console.log("productId",productId);
    
    if(productId){
      this.apiService.get(`/v1/exhibitor/product?productid=${productId}`).subscribe((res:any) => {
        this.productDetail = res;
        console.log("this.productDetail",this.productDetail);
        if (this.productDetail?.productStickers?.iIsCompany === 0) {
          this.infoTypeSignal.set('Product Info');
        } else {
          this.infoTypeSignal.set('Company Info');
        }
        
      })
    }
  }

  onInfoTypeChange(type:string):void{
    this.infoTypeSignal.set(type);
  }

}
