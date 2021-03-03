import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponse, AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMsg: string = '';
  isNewUser = true;
  
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
  }
  
  switchMode(): void {
    this.isNewUser = !this.isNewUser;
  }
  
  saveFormData(form: NgForm) {
    if(form.valid) {
      let userObs$: Observable<AuthResponse>;
      const email = form.value.email;
      const password = form.value.password;

      if(this.isNewUser) {
        userObs$ = this.authService.register(email, password);
      } else {
        userObs$ = this.authService.login(email, password);
      }

      userObs$.subscribe(
        response => console.log(response),
        errorMessage => {
          this.errorMsg = errorMessage;
        }
      );
      form.reset();
    }
  } 

}
