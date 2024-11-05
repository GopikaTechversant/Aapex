import { Routes } from '@angular/router';
import { ProductStickerListPageComponent } from './Product-sticker-list/product-sticker-list-page/product-sticker-list-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EditProductComponent } from './Edit-product/edit-product/edit-product.component';
export const routes: Routes = [
    {path:'',component: ProductStickerListPageComponent},
    {path:'productStickerList',component: ProductStickerListPageComponent},
    {path:'contactUs',component: ContactUsComponent},
    {path:'edit',component: EditProductComponent}

];
