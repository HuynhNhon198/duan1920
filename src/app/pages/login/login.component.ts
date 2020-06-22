import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('ipFocus', { static: false }) ipF: ElementRef;
  validateForm: FormGroup;
  login = true;


  constructor(
    private fb: FormBuilder,
    private FBSV: FirebaseService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.ipF.nativeElement.focus(), 500);
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const { email, password } = this.validateForm.controls;
      this.FBSV.signIn(email.value, password.value);
    }
  }
  resetPassword() {
    const email = this.validateForm.controls.email.value;
    if (email) {
      this.FBSV.resetPassword(email);
    } else {

    }
  }
}
