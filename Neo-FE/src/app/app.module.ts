import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DEFAULT_TIMEOUT, HttpInterceptorService } from './services/http-interceptor';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { neoEffects, neoReducers, NEO_FEATURE } from './store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthFacade } from './services/auth.facade';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GridsterModule } from 'angular-gridster2';
import { DashboardFacade } from './services/dashboard.facade';
import { ModalService } from './services/modal.service';
import { AddWidgetModalComponent } from './components/dashboard/add-widget-modal/add-widget-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { LoginComponent } from './components/signin/login.component';
import { HistoryFacade } from './services/history.facade';
import { HistoryComponent } from './components/history/history.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MetadataFacade } from './services/metadata.facade';
import { NasaDashboardComponent } from './components/nasa-dashboard/nasa-dashboard.component';
import { AddNasaWidgetModalComponent } from './components/nasa-dashboard/add-nasa-widget-modal/add-nasa-widget-modal.component';
import { NasaDashboardFacade } from './services/nasa-dashboard.facade';
import { MapDataModalComponent } from './components/nasa-dashboard/map-data-modal/map-data-modal.component';
import { HighchartsChartModule } from 'highcharts-angular';

const jwtProvider = {
  provide: JwtHelperService,
  useFactory: () => new JwtHelperService()
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    HomeComponent,
    DashboardComponent,
    NasaDashboardComponent,
    AddWidgetModalComponent,
    AddNasaWidgetModalComponent,
    LoginComponent,
    HistoryComponent,
    MapDataModalComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(neoEffects),
    StoreModule.forFeature(NEO_FEATURE, neoReducers),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FlexLayoutModule,
    GridsterModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    MatInputModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    NgxMatMomentModule,
    SocialLoginModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    HighchartsChartModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  },
  {
    provide: DEFAULT_TIMEOUT,
    useValue: 60000
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('778346190675-ta0pn5r045g7h8415dap39buriocgos1.apps.googleusercontent.com')
        }
      ]
    }
  },
    AuthFacade,
    jwtProvider,
    DashboardFacade,
    ModalService,
    HistoryFacade,
    MetadataFacade,
    NasaDashboardFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
