import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';
import { SwitchCompanyComponent } from '../../switch-company/switch-company.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf,SwitchCompanyComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
 
})
export class HeaderComponent implements OnInit{
  companyName = '31 INCORPORATED';
  companyId = 4610743;
  isMenuOpen :boolean = false;
  constructor(private dialog: MatDialog,private el: ElementRef) {}
  @HostListener('document:click', ['$event'])
  onBodyClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }
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

  logout() {
    console.log('Logout clicked');
  }
  openModal() {
    const dialogRef = this.dialog.open(LeftSidebarComponent, {
      width: '380px',
      height: '100vh',
      position: { left: '0px', top: '0px' },
      panelClass: 'custom-dialog'
    });
  }
  switchCompany(){const dialogRef = this.dialog.open(SwitchCompanyComponent, {
    width: '800px',
    height: '450px',
    panelClass: 'custom-dialog'
  });
  this.isMenuOpen = !this.isMenuOpen;
}
}
