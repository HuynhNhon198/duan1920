import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment.prod';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

firebase.initializeApp(environment.firebase);

const db = firebase.firestore();

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  questionsCol = 'questions';
  testSubjectCol = 'test_subjects';
  classesCol = 'classes';
  examsCol = 'exams';
  constructor(private helper: HelperService, private afs: AngularFirestore) { }

  async getDoc(col: string, doc: string) {
    const idL = this.helper.loadingMessage('Đang Truy Vấn...');
    const data = await db.collection(col).doc(doc).get();
    this.helper.closeMessage(idL);
    if (data.exists) {
      return Object.assign({ _id: data.id }, data.data());
    } else {
      return undefined;
    }

  }

  async deleteDoc(col: string, doc: string) {
    const idL = this.helper.loadingMessage('Đang xóa...');
    await db.collection(col).doc(doc).delete();
    this.helper.closeMessage(idL);
    return true;
  }

  async setDoc(col: string, doc: string, data: any, create?: boolean, stopL?: boolean) {
    const idL = stopL ? '' : this.helper.loadingMessage('Đang Lưu...');
    const ref = doc.length > 0 ? db.collection(col).doc(doc) : db.collection(col).doc();

    data[create ? 'ctime' : 'mtime'] = this.helper.getMiliSec();
    if (create) {
      const { uid, name } = this.helper.getRole();
      if (uid) {
        data.create_by = { uid, name };
      }
    }

    await ref.set(data, {
      merge: true
    }).catch(err => {
      this.helper.closeMessage(idL);
      this.helper.createMessage('Có Lỗi Xảy Ra...', 'error', 5000);
      return;
    });
    stopL ? '' : this.helper.closeMessage(idL);
    stopL ? '' : this.helper.createMessage('Đã Lưu.', 'success', 1500);
    return ref.id;
  }

  async getTests() {
    const data = [];
    const docs = await db.collection('test_subjects').where('public', '==', true).get();
    docs.forEach(doc => {
      data.push(Object.assign({ _id: doc.id }, doc.data()));
    });
    return data;
  }

  async myDocs(col: string) {
    const data = [];
    const docs = await db.collection(col).where('create_by.uid', '==', (this.helper.getRole()).uid).get();
    docs.forEach(doc => {
      data.push(Object.assign({ _id: doc.id }, doc.data()));
    });
    return data;
  }

  async getDocsWithCondi(col: string, field: string, opera: firebase.firestore.WhereFilterOp, value: any) {
    const data = [];
    const docs = await db.collection(col).where(field, opera, value).get();
    docs.forEach(doc => {
      data.push(Object.assign({ _id: doc.id }, doc.data()));
    });
    return data;
  }

  async getExamOfClass(class_id: string) {
    const data = [];
    const docs = await db.collection('exams').where('of_class', '==', class_id).get();
    docs.forEach(doc => {
      data.push(Object.assign({ _id: doc.id }, doc.data()));
    });
    return data;
  }

  async erroll(code: string) {
    const idL = this.helper.loadingMessage('Đang Kiểm Tra...');
    const classData = await this.getDocsWithCondi(this.classesCol, 'code', '==', code.toUpperCase());
    if (classData.length > 0) {
      const in_class = classData[0].students || [];
      if (!in_class.includes(this.helper.getRole().uid)) {
        const batch = db.batch();
        const userRef = db.collection('users').doc(this.helper.getRole().uid);
        const { _id, name, create_by } = classData[0];
        batch.update(userRef, {
          in_class: firebase.firestore.FieldValue.arrayUnion({
            id: _id,
            name,
            teacher: create_by,
            code
          })
        });

        const studentRef = db.collection(this.classesCol).doc(classData[0]._id).collection('students').doc(this.helper.getRole().uid);
        const userData = (await userRef.get()).data();
        batch.update(db.collection(this.classesCol).doc(classData[0]._id), {
          students: firebase.firestore.FieldValue.arrayUnion(this.helper.getRole().uid)
        });
        batch.set(studentRef, {
          name: userData.name,
          email: userData.email,
          id: this.helper.getRole().uid,
          ctime: this.helper.getMiliSec(),
          hometown: userData.hometown || '',
          phone: userData.phone || ''
        });
        await batch.commit();
        this.helper.closeMessage(idL);
        this.helper.createMessage('Tham Gia Lớp Học Thành Công', 'success');
        return true;
      } else {
        this.helper.closeMessage(idL);
        this.helper.createMessage('Bạn Đã Tham Gia Lớp Học Này Rồi.', 'error');
      }


    } else {
      this.helper.closeMessage(idL);
      this.helper.createMessage('Mã Lớp Bạn Nhập Không Tồn Tại, Vui Lòng Kiểm Tra Lại', 'error');
    }
  }

  getExam(id: string) {
    const doc: AngularFirestoreDocument = this.afs.collection(this.examsCol).doc(id);
    return doc.valueChanges();
  }

  subStudentInExam(id_exam: string, id_student: string) {
    const doc: AngularFirestoreDocument = this.afs.collection(this.examsCol).doc(id_exam).collection('students').doc(id_student);
    return doc.valueChanges();
  }

  subStudentsInExam(id_exam: string) {
    const docs: AngularFirestoreCollection = this.afs.collection(this.examsCol).doc(id_exam).collection('students');
    return docs.valueChanges();
  }

  subNoty() {
    const docs: AngularFirestoreCollection = this.afs.collection('notifs', ref => ref.where('to_uid', '==', this.helper.getRole().uid)
      .where('seen', '==', false).orderBy('ctime', 'desc'));
    return docs.valueChanges();
  }

  async create_noty(content: string, to_uid: string) {
    return await this.setDoc('notifs', '', {
      content,
      to_uid,
      seen: false
    }, true, true);
  }
  // getInForStudent() {

  // }
}
