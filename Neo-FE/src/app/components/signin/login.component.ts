import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthFacade } from 'src/app/services/auth.facade';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthFacade,
    private router: Router
  ) { }

  readonly isAuthenticated$ = this.authService.isAuthenticated$.pipe(
    tap((isAuth) => {
      if (isAuth) {
        this.router.navigate(['nasa-dashboard']);
      }

    }));;

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.user = user
    })
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.authService.login({ tokenId: user.idToken });
      });
  }
}