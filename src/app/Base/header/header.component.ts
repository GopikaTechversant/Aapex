import { Component, ElementRef, EventEmitter, HostListener, Input, input, OnInit, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';
import { SwitchCompanyComponent } from '../../switch-company/switch-company.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
 
})
export class HeaderComponent implements OnInit{
  @Input() stickerCount:number = 0;
  @Output() companyChanged = new EventEmitter<void>();
  @Input() products_list: any[] = [];
  @Input() userRole:any;
  companyName = '31 INCORPORATED';
  companyId = 4610743;
  isMenuOpen :boolean = false;
  constructor(private dialog: MatDialog,private el: ElementRef,private router: Router) {}
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
      .slice(0, 2) // Get the first two words
      .map(word => word[0]) // Map to their first letters
      .join(''); // Join the letters together
  }
  

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
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
  dialogRef.afterClosed().subscribe((result: { name: string; id: number }) => {
    if (result) {
      this.companyName = result.name; // Update the company name
      this.companyId = result.id; // Update the company ID
    }
    this.companyChanged.emit();
  });
  this.isMenuOpen = !this.isMenuOpen;
}
}
