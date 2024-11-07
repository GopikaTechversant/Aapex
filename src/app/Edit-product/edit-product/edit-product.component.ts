import { Component, OnInit } from '@angular/core';
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
  imports: [HeaderComponent, FooterComponent, LeftSidebarComponent, CompanyDetailComponent, MediaUploadComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  constructor( private apiService: ApiServiceService,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.fetchCompanyDetails();
  }

  fetchCompanyDetails():void{
    const productId = this.route.snapshot.queryParamMap.get('id');
    if(productId){
      console.log("productId",productId);
      this.apiService.get(`/v1/exhibitor/product?productid=${productId}`).subscribe((res:any) => {
        console.log("res",res);
      })
    }
   
  }

}
