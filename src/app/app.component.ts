import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductStickerListPageComponent } from './Product-sticker-list/product-sticker-list-page/product-sticker-list-page.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductStickerListPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aapex';
}
