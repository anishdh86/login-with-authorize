import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';

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
      const email = form.value.email;
      const password = form.value.password;

      this.authService.register(email, password).subscribe(
        response => console.log(response),
        error => this.errorMsg = error.error.error.message
      );
      form.reset();
    }
  } 

}
