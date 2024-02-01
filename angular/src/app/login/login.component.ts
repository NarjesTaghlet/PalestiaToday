import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";
import {User} from "../Model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  user! : User | null ;

  constructor( private authService: AuthService,private toastr: ToastrService,private router: Router) {

  }


  OnLogin() {
    this.authService.login(this.credentials).subscribe(
      response => {
          this.authService.isLoggedIn.next(true)
          localStorage.setItem('access_token', response.access_token);
        //les données de user
        this.user = this.authService.getUser(response.access_token);
          if(this.user?.role==='admin'){
          this.router.navigate(['/word']);
        }else{
          this.router.navigate(['/articles']);

        }
        this.toastr.success('Login successful', 'Success');
      },
      error => {
        console.error('Login failed', error);
        this.toastr.error('Login Failed :(  , veuillez vérifier vos credentials', 'Error');
      }
    );
    return this.user;
  }
}
