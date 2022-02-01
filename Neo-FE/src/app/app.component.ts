import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { AuthFacade } from './services/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project Neo';
  public isAuthenticated = false;

  constructor(private authService: AuthFacade) { }

  readonly isAuthError$ = this.authService.getLoginErrors$.pipe(
    tap((isError) => {
      if(isError) {
        this.authService.logout();
      }
    })
  )

  ngOnInit() {
    this.authService.attemptLoginFromSessionStorage();
  }

  logout(): void {
    this.authService.logout();
  }
}
