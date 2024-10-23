import { Component, contentChild } from '@angular/core';
import { HeaderComponent } from '../../Base/header/header.component';
import { FooterComponent } from '../../Base/footer/footer.component';
import { LeftSidebarComponent } from '../../Base/left-sidebar/left-sidebar.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ProductListTableComponent } from '../product-list-table/product-list-table.component';
@Component({
  selector: 'app-product-sticker-list-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,LeftSidebarComponent,WelcomeComponent,ProductListTableComponent],
  templateUrl: './product-sticker-list-page.component.html',
  styleUrl: './product-sticker-list-page.component.css'
})
export class ProductStickerListPageComponent {

}
