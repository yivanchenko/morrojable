import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router } from '@angular/router';

import { filter } from 'rxjs/operators';

import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';


@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {

  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {

    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '450px',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed()
      .pipe(filter(r => r))
      .subscribe(result => this.tryLogin(result.email, result.password));

    dialogRef.afterClosed()
      .pipe(filter(r => !r))
      .subscribe(() => this.router.navigate(['/user']));

  }

  tryLogin(email, password) {

    this.authService.doLogin(email, password)
      .then(result => {

      },
      error => {
        console.log(error.message);
      })
      .finally(() => {
        this.router.navigate(['/user']);
      });

  }

}
