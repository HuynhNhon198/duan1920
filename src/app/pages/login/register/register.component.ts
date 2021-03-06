import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from '../../../services/helper.service';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('ipfocus', { static: true }) ipFocus: ElementRef;
  validateForm: FormGroup;
  role: string;
  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private FBSV: FirebaseService
  ) { }

  async submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid && this.validateForm.controls.agree.value) {
      if (this.role) {
        const { name, email, password } = this.validateForm.controls;
        this.FBSV.register(name.value, this.role, email.value, password.value);
      } else {
        this.helper.createMessage('Vui lòng cho chúng tôi biết bạn là ai, Giáo Viên hoặc Học Sinh', 'error');
      }
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  ngOnInit(): void {
    this.ipFocus.nativeElement.focus();
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      agree: [true]
    });
  }

  login() {
    location.reload();
  }

}
