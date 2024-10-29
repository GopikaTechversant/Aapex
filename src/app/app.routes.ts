import { Routes } from '@angular/router';
import { ProductStickerListPageComponent } from './Product-sticker-list/product-sticker-list-page/product-sticker-list-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
export const routes: Routes = [
    {path:'',component: ProductStickerListPageComponent},
    {path:'contactUs',component: ContactUsComponent}
];
