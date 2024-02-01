import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = '';
  password = '';
  email = '';
  confirmpassword = '';


  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }
  onRegister() {

    const email = this.email;
    const password = this.password;
    const username = this.username;
    if(this.mustMatch()) {
      this.authService.register(email, password, username).subscribe(
        (response) => {
          this.toastr.success('Registration successful. Please log in.');
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error)
          this.toastr.error('Registration failed. Please try again ', error.error.message);

        }
      );
    }
    else{
      this.toastr.error('Passwords do not match');

    }
  }


  public mustMatch() {
    return ( this.confirmpassword && this.password === this.confirmpassword )

  }

}
