import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  private CALENDAR_SETTINGS_URL = 'https://timelyapp.time.ly/api/calendars/info';

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public postCalendarSettings(): Observable<any> {
    return this.httpClient.post(this.CALENDAR_SETTINGS_URL, {url: "https://calendar.time.ly/ficceyp4" }).pipe(catchError(this.handleError));
  }
}
