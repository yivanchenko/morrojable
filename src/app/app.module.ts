import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule } from '@angular/material';

import { rootRouterConfig } from './app.routes';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';

import { AppComponent } from './app.component';
import { CustomRouteReuseStrategy } from './customroutereuse.strategy';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginDialogComponent,
    UserComponent,
    RegisterComponent
  ],
  entryComponents: [LoginDialogComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false, onSameUrlNavigation: 'reload' }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    AuthService,
    UserService,
    UserResolver,
    AuthGuard,
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
