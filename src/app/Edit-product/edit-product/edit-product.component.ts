import { Component } from '@angular/core';
import { FooterComponent } from '../../Base/footer/footer.component';
import { HeaderComponent } from '../../Base/header/header.component';
import { LeftSidebarComponent } from '../../Base/left-sidebar/left-sidebar.component';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';
import { MediaUploadComponent } from '../media-upload/media-upload.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, LeftSidebarComponent, CompanyDetailComponent, MediaUploadComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

}
