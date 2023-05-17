import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth-profile/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any = null;

  constructor(public authService: AuthService) {

  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
  }
}
