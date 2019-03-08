import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.component.html',
})
export class LoginDialogComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.loginForm = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {

    if (this.loginForm.invalid) {
      return;
    }

    this.dialogRef.close(this.loginForm.value);
  }

  getErrors(controlName) {
    let control = this.loginForm.get(controlName);
    if (control.dirty || control.touched) {
      return control.errors;
    }
    return null;
  }

}
