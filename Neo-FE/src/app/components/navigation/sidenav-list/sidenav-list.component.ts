import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AuthFacade } from 'src/app/services/auth.facade';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  @Output() sidenavClose = new EventEmitter();

  constructor(private router: Router, private authService: AuthFacade) { }

  readonly isAuthenticated$ = this.authService.isAuthenticated$;

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  navigateToHistory() {
    this.router.navigate(['history'])
    this.onSidenavClose();
  }

  logout() {
    this.authService.logout();
    this.onSidenavClose();
  }

}