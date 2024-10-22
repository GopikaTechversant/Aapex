import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('slideInFromLeft', [
      state('void', style({ transform: 'translateX(-100%)' })),
      state('*', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
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

  switchCompany() {
    console.log('Switch company clicked');
  }

  logout() {
    console.log('Logout clicked');
  }
  openModal() {
    const dialogRef = this.dialog.open(LeftSidebarComponent, {
      width: '320px',
      height: '100vh',
      position: { left: '0px', top: '0px' },
      panelClass: 'custom-dialog'
    });
  }
}
