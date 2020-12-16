import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  /**
   * @method submitRegistration
   */
  public submitRegistration(request: any): Observable<any> {
    const url =  environment.apiUrl + 'registration';
    return this.http.post(url, request);
  }
}
