import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthFacade } from 'src/app/services/auth.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authService: AuthFacade) { }

  readonly isAuthenticated$ = this.authService.isAuthenticated$;
  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }

}