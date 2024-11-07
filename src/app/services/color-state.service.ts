// color-state.service.ts
import { Injectable } from '@angular/core';
import { WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorStateService {
  // This signal will store the color of the button
  buttonColor: WritableSignal<string> = signal('#d1d5db'); // Set default color
}
