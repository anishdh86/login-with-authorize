import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private http: HttpClient
  ) {}

  login() {

  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDu_oPdGdkd2n6OHhBX_RRzh5G4AbXkwOw',
      {
        email,
        password,
        returnSecureToken: true
      }
    )
  }
}