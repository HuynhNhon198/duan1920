import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { FirestoreService } from '../../../services/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';

const db = firebase.firestore();
@Component({
  selector: 'app-do-exam',
  templateUrl: './do-exam.component.html',
  styleUrls: ['./do-exam.component.scss']
})
export class DoExamComponent implements OnInit, OnDestroy {
  exam_id: string;
  exam: any = {};
  chooses = [];
  test_subject: any = {};
  student: any = {};
  studentRef: firebase.firestore.DocumentReference;
  timeView = '00:00';
  count = 0;
  bailam = [];
  sub: Subscription;
  ready = false;
  outDate: boolean;
  timer: NodeJS.Timeout;
  done = false;
  history: any = {};
  constructor(
    private helper: HelperService,
    private fsSV: FirestoreService,
    private route: ActivatedRoute
  ) {

    route.params.subscribe(params => {
      this.exam_id = params.id;
      this.studentRef = db.collection(this.fsSV.examsCol).doc(this.exam_id).collection('students').doc(this.helper.getRole().uid);
    });
  }

  async ngOnInit() {
    this.sub = this.fsSV.getExam(this.exam_id).subscribe(async exam => {
      const { title, ctime, duration, status, time_start, test_subject_id } = exam;
      this.exam = { title, ctime, duration, status, time_start, test_subject_id };
      this.student = (await db.collection(this.fsSV.examsCol).doc(this.exam_id).collection('students').doc(this.helper.getRole().uid).get()).data();
      if (!this.student || this.student.status !== 1) {
        this.timeRest(time_start);
      } else {
        const test_subject = await this.fsSV.getDoc(this.fsSV.testSubjectCol, this.exam.test_subject_id);
        test_subject.questions.forEach((element, i) => {
          element.chooses = this.student.chooses[i]?.chooses || [];
          element.chooses.forEach(ee => {
            element.answers[ee].choose = true;
          });
        });
        this.history = {
          mark: (this.student.results.corrects.length / this.student.results.q_length) * 10,
          ctime: this.student.ctime,
          endtime: this.student.results.time,
          questions: test_subject.questions
        };
      }
      // if (status === 0) {
      // }
    });

    // this.countDown();
  }

  timeRest(time_start: number) {
    let now = this.helper.getMiliSec();

    const timer = setInterval(async () => {
      now++;
      const resSec = time_start - now;
      if (resSec <= 0) {
        if (this.exam.status === 0) {
          await this.fsSV.setDoc(this.fsSV.examsCol, this.exam_id, {
            status: 1
          });
        }
        if (resSec > -(20 * 60)) {
          this.outDate = false;
        } else {
          this.outDate = true;
          clearInterval(timer);
        }
      } else {
        this.timeView = this.convertToTimeView(resSec);
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  async countDown(duration: number) {
    let d = 0;
    this.fsSV.subStudentInExam(this.exam_id, this.helper.getRole().uid).subscribe(user => {
      if (user.duration !== d) {
        d = user.duration;
        clearInterval(this.timer);
        this.count = user.duration;
        // this.time = this.questions.time;
        this.timer = setInterval(async () => {
          if (this.count >= 0) {
            this.timeView = this.convertToTimeView(this.count);
            this.count--;
            if (this.count % 60 === 0) {
              await this.studentRef.set({
                duration: this.count
              }, {
                merge: true
              });
            }
          } else {
            this.submit();
            clearInterval(this.timer);
          }
        }, 1000);
      }
    });
  }

  convertToTimeView(sec: number) {
    const quotient = Math.floor(sec / 60);
    const remainder = sec % 60;
    const newRemainder = remainder < 10 ? '0' + remainder : remainder;
    return `${quotient}:${newRemainder}`;
  }

  async choose(i: number) {
    this.test_subject.questions[i]['chooses'] = this.test_subject.questions[i].answers.map((e, ind) => e['choose'] ? ind : undefined).filter(x => x !== undefined);
    this.chooses = this.test_subject.questions.map(x => {
      return { chooses: x['chooses'] || [] };
    });
    await this.studentRef.set({
      chooses: this.chooses
    }, {
      merge: true
    });
  }

  scroll(id: string) {
    const el = document.getElementById(id);
    if (el !== null) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async readyToDo() {
    this.ready = true;
    let student = await this.studentRef.get();
    this.test_subject = await this.fsSV.getDoc(this.fsSV.testSubjectCol, this.exam.test_subject_id);
    if (student.exists) {
      this.countDown(student.data().duration);
      this.chooses = student.data().chooses;
      this.test_subject.questions.forEach((element, i) => {
        element.chooses = student.data().chooses[i]?.chooses || [];
        element.chooses.forEach(ee => {
          element.answers[ee].choose = true;
        });
      });

    } else {
      const { name, uid, email } = this.helper.getRole();
      await this.studentRef.set({
        ctime: this.helper.getMiliSec(),
        chooses: [],
        duration: this.exam.duration * 60,
        status: 0,
        info: { name, uid, email }
      }, {
        merge: true
      });
      student = await this.studentRef.get();
      this.countDown(student.data().duration);
    }

  }

  async getStudentInExam() {
    const student = await this.studentRef.get();
    return student.data();
  }

  async submit() {
    const results = {
      time: this.helper.getMiliSec(),
      q_length: this.test_subject.questions.length,
      corrects: []
    };
    this.test_subject.questions.forEach((q, i) => {
      const test = [];
      q.answers.forEach((a, ind) => {
        if (this.chooses[i] && a.correct && this.chooses[i].chooses.includes(ind)) {
          test.push(true);
        }
      });
      if (test.length === q.answers.filter(x => x.correct).length && test.length === q.answers.filter(x => x.choose).length) {
        results.corrects.push(i);
      }
    });
    this.studentRef.set({
      status: 1,
      results
    }, {
      merge: true
    });
    clearInterval(this.timer);
    location.reload();
  }
}
