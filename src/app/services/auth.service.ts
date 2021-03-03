import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDu_oPdGdkd2n6OHhBX_RRzh5G4AbXkwOw',
      {
        email,
        password,
        returnSecureToken: true
      } 
    ).pipe(catchError(this.handleError))
  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDu_oPdGdkd2n6OHhBX_RRzh5G4AbXkwOw',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError))
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMsg = 'An error occured!'
        if (!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMsg);
        }
        switch(errorResponse.error.error.message) {
          case 'EMAIL_EXISTS': 
            errorMsg = 'This email is already in use. Please choose another email.';
          break;
          case 'EMAIL_NOT_FOUND': 
            errorMsg = 'No user could be found with the email you entered.';
          break;
          case 'INVALID_PASSWORD':
            errorMsg = 'The password you entered is incorrect.';
        }
        return throwError(errorMsg);
  }
}