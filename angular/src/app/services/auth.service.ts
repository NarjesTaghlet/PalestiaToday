// auth.service.ts
import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, map, Observable, of, switchMap, tap} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {User} from "../Model/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router, private http: HttpClient,private route: ActivatedRoute) {
        // Set initial login status based on the presence of the token
        this.isLoggedIn.next(this.isAuthenticated());
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('access_token');
        return !!token;
    }

    private apiUrl = 'http://localhost:3000';
    isLoggedIn = new BehaviorSubject<boolean>(false);
    // Expose the observable part of the isLoggedIn subject
    isLoggedIn$ = this.isLoggedIn.asObservable();
    user! : User | null ;


    login(credentials: { username: string; password: string }): Observable<any> {
       
        return this.http.post<any>(`${this.apiUrl}/user/login`, credentials)
        /*.pipe(
          tap((response: any) => {
              localStorage.setItem('access_token', response.access_token);
              const role = this.getUser(response.access_token)?.role;
              console.log("asslemaa")
              console.log(this.user);
          })
      );
      */

    }


    getUser(token: string):User | null{
        if (!token) {
            return null;
        }
        return JSON.parse(atob(token.split('.')[1])) as User;
    }


    getUserbyId(idUser : number):Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/user/${idUser}`);
    }




    getToken() {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {return '';

        }
        return  access_token;

    }

    register(email: string, password: string, username : string) : Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/user`, {username,email,password})    }


    logout(): void {
        this.isLoggedIn.next(false);
        localStorage.removeItem('access_token');

    }

    isAdmin() {
        const token =this.getToken();
        const user = this.getUser(token);
        return user?.role === 'admin';

    }

 

}
