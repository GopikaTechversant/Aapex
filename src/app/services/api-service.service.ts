import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environment/environments';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }
  private createHeaders(): HttpHeaders {
    const token = 'D13E796F07B2652206DA6F04E74A23BD043C6F97EF1C45537831FE53C9F48924';
    return new HttpHeaders({
      'hash': `${token}`,
      'time': 1667349155588,
      'userid':2450
    });
  }

    // Generic GET method
    get(url: string): Observable<any> {
      return this.http.get(`${environment.api_url}${url}`, { headers: this.createHeaders() });
    }

}
