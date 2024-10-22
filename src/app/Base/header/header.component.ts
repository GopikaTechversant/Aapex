import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  companyName = '31 INCORPORATED';
  companyId = 4610743;
  isMenuOpen :boolean = false;
  constructor(){}
  ngOnInit(): void {
    
  }

  get companyNameInitials(): string {
    return this.companyName
      .split(' ')
      .map(word => word[0])
      .join('');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  switchCompany() {
    console.log('Switch company clicked');
  }

  logout() {
    console.log('Logout clicked');
  }

}
