import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
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

  public getEventListUrl(calendarId: number): string {
    return 'https://timelyapp.time.ly/api/calendars/' + calendarId + '/events';
  }

  public getEventList(calendarId: number): Observable<any> {
    return this.httpClient.get(this.getEventListUrl(calendarId)).pipe(catchError(this.handleError));
  }
}
