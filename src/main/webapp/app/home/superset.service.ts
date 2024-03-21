import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { embedDashboard } from '@superset-ui/embedded-sdk';

@Injectable({
  providedIn: 'root'
})
export class SupersetService {
  private apiUrl = 'http://localhost:8088/api/v1/security';

  constructor(private http: HttpClient) {
  }

  private fetchAccessToken(): Observable<any> {
    const body = {
      'username': 'admin',
      'password': 'admin',
      'provider': 'db',
      'refresh': true
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers });
  }

  private fetchGuestToken(accessToken: any): Observable<any> {
    const body = {
      'resources': [
        {
          'type': 'dashboard',
          'id': '629075f0-537b-4f73-bfa5-caf9213ee7cc'
        }
      ],
      'rls': [{ 'clause': 'stage_of_development = \'Pre-clinical\'' }],
      'user': {
        'username': 'guest',
        'first_name': 'Guest',
        'last_name': 'User'
      }
    };

    const acc = accessToken['access_token']; //accessToken is an object in which there are two tokens access_token and refresh_token ,out of which we just need to send access_token to get guest_token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${acc}`
    });

    return this.http.post<any>(`${this.apiUrl}/guest_token/`, body, { headers });
  }

  /**
   *
   * @returns { guest Token }
   */
  getGuestToken(): Observable<any> {
    return this.fetchAccessToken().pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      }),
      switchMap((accessToken: any) => this.fetchGuestToken(accessToken))
    );
  }

  embedDashboard(): Observable<void> {
    return new Observable((observer) => {
      this.getGuestToken().subscribe(
        (token) => {
          embedDashboard({
            id: '629075f0-537b-4f73-bfa5-caf9213ee7cc', // Replace with your dashboard ID
            supersetDomain: 'http://localhost:8088',
            mountPoint: document.getElementById('dashboard')!,
            fetchGuestToken: () => token['token'],
            dashboardUiConfig: {
              hideTitle: false,
              hideChartControls: false,
              hideTab: false
            }
          });
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
