import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ApiServiceService } from '../services/api-service.service';
import { Subject, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-switch-company',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './switch-company.component.html',
  styleUrls: ['./switch-company.component.css'], 
})
export class SwitchCompanyComponent {
  private searchSubject = new Subject<string>();
  company_list: any[] = [];
  loading: boolean = false;
  searchValue: string = '';
  noRecordsFound: boolean = false;

  constructor(private apiService: ApiServiceService) {
    this.setupSearchSubscription(); 
  }

  ngOnInit() {
    this.loadCompanies();
  }
  proceedCompany(selectedRegId: string, company: any) {
    const selectedUser = company.users.find((user: any) => user.iRegId === +selectedRegId); 
  
    if (selectedUser) {
      const data = {
        iRegId: selectedUser.iRegId,
        sEventId: selectedUser.event.sEventId,     
        sShow: selectedUser.event.show,            
        sOrgId: selectedUser.companyMaster.sOrgId,                      
        sRole: selectedUser.userRoles.sName,         
        sHash: "D13E796F07B2652206DA6F04E74A23BD043C6F97EF1C45537831FE53C9F48924", 
        sTime: 1667349155588                
      };

      this.apiService.post(`/v1/exhibitor/user-data`, data).subscribe({
        next: (res: any) => {
          console.log(res); 
        },
        error: () => {
        },
        complete: () => {
        },
      });
    } else {
      console.error("User not found with the selected registration ID");
    }
  }
  
  
  loadCompanies() {
    this.loading = true;
    this.apiService.get(`/v1/exhibitor/users`).subscribe({
      next: (res: any) => {
        this.company_list = res.companyBos;
        this.noRecordsFound = this.company_list.length === 0;
      },
      error: () => {
        this.loading = false; 
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  setupSearchSubscription() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        switchMap((searchValue) => {
          if (searchValue.trim() === '') {
            this.loadCompanies(); 
            return [];
          }
          const url = `/v1/exhibitor/search-users?searchValue=${searchValue}`;
          return this.apiService.get(url);
        })
      )
      .subscribe({
        next: (res: any) => {
          this.company_list = res.companyBos;
          this.noRecordsFound = this.company_list.length === 0; 
          this.loading = false; 
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement; 
    this.searchValue = target.value; 
    this.loading = true; 
    this.noRecordsFound = false; 
    this.searchSubject.next(this.searchValue); 
  }
}
