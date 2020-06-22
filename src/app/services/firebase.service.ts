import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';
import { FirestoreService } from './firestore.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user: {
    displayName: string;
    email: string;
    photoURL: string;
  };
  constructor(
    private authSV: AngularFireAuth,
    private router: Router,
    private helper: HelperService,
    private fsSV: FirestoreService
  ) {
    // listen auth state
    authSV.onAuthStateChanged(async user => {
      if (user !== null) {
        if (user.emailVerified) {
          const claims = (await user.getIdTokenResult(true)).claims;
          const { role, name, email, user_id } = claims;
          this.helper.setRole({
            role, name, email, uid: user_id, photoUrl: user.photoURL
          });
        }
      } else {
        router.navigate(['login']);
      }
    });
  }

  // Login to web with google plus method
  async googleLogin(): Promise<void> {
    await this.authSV.signInWithPopup(new auth.GoogleAuthProvider());
  }

  // SignIn to web with email, password
  async signIn(email: string, password: string) {
    const idL = this.helper.loadingMessage('ĐANG ĐĂNG NHẬP...');
    const r = await this.authSV.signInWithEmailAndPassword(email, password).catch(err => {
      let text = 'Có Lỗi Xảy Ra, Vui lòng kiểm tra lại hoặc liên hệ quản trị viên.';
      switch (err.code) {
        case 'auth/user-not-found':
          text = 'Email bạn nhập không tồn tại trên hệ thống!';
          break;
        case 'auth/wrong-password':
          text = 'Sai mật khẩu!';
          break;
        default:
          break;
      }
      this.helper.closeMessage(idL);
      this.helper.createMessage(text, 'error', 3000);
    });
    if (r) {
      this.helper.closeMessage(idL);
      if (!r.user.emailVerified) {
        this.helper.createMessage('Tài Khoản Của Bạn Chưa Được Xác Thực, Vui Lòng Kiểm Tra Email', 'warning');
      } else {
        const claims = (await r.user.getIdTokenResult(true)).claims;
        const { role, name, user_id } = claims;
        // const userData = await this.fsSV.getDoc('users', user_id);
        // if (userData.signing) {

        // } else {

        // }
        this.helper.setRole({
          role, name, email, uid: user_id, photoUrl: r.user.photoURL
        });
        this.router.navigate(['/']);
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    }
  }

  // signup to web with email password
  async register(name: string, role: string, email: string, password: string) {
    const idL = this.helper.loadingMessage('ĐANG ĐĂNG KÍ TÀI KHOẢN...');
    const result = await this.authSV.createUserWithEmailAndPassword(email, password).catch(err => {
      this.helper.closeMessage(idL);
      this.helper.createMessage('LỖI: ' + err.code, 'error', 3000);
    });
    if (result) {
      this.helper.closeMessage(idL);
      this.helper.createMessage('Tạo Tài Khoản Thành Công', 'success');
      await (await this.authSV.currentUser).sendEmailVerification();
      result.user.updateProfile({
        displayName: name
      });
      await this.fsSV.setDoc('users', result.user.uid, {
        name,
        email,
        role,
        phone: '',
        school: '',
        hometown: ''
      }, true);
      this.helper.createMessage('Vui Lòng Kiểm Tra Email Để Xác Thực Tài Khoản', 'warning', 3000);
      setTimeout(() => location.reload(), 2500);
    }
  }

  // Reset password
  async resetPassword(email: string) {
    await this.authSV.sendPasswordResetEmail(email).catch(err => {
      let text = 'Có Lỗi Xảy Ra, Vui lòng kiểm tra lại hoặc liên hệ quản trị viên.';
      switch (err.code) {
        case 'auth/user-not-found':
          text = 'Email bạn nhập không tồn tại trên hệ thống!';
          break;
        default:
          break;
      }
      this.helper.createMessage(text, 'error', 3000);
    });
    this.helper.createMessage(`Vui Lòng Kiểm Tra Email: ${email} Để Đặt Lại Mật Khẩu`, 'warning');
  }

  async signOut() {
    await this.authSV.signOut();
    this.helper.setRole({
      uid: undefined
    });
  }

}
