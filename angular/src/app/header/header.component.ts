import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isLoggedIn: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.isLoggedIn = this.authService.isAuthenticated();
        this.authService.isLoggedIn$.subscribe((loggedInStatus) => {
            this.isLoggedIn = loggedInStatus;
            console.log("Navbar isLoggedIn status:", this.isLoggedIn);
        });
    }

    isAdmin() {
        const token =this.authService.getToken();
        const user = this.authService.getUser(token);
        return user?.role === 'admin';

    }

    logout() {
        this.authService.logout();

    }
}
