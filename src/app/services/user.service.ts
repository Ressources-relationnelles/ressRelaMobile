import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ngUnsubscribe: Subject<any> = new Subject();

  public searchTerm : string ="";


  constructor(private db : AngularFirestore, private auth : AuthService, private afAuth : AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
      }
    })
  }

  getUsers() {
    return this.db.collection('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...(data as {}) };
      })),
      takeUntil(this.ngUnsubscribe)
      );
    }

  getUser(id) {
    return this.db.doc(`users/${id}`).valueChanges().pipe(
      take(1)
      );
  }

  createOrUpdateUser(id=null, info: any) :Promise<any> {
    if (id) {
      return this.db.doc(`users/${id}`).update(info);
    } else {
      // info['creator'] = this.auth.currentUser.value.id;
      info['created'] = firebase.default.firestore.FieldValue.serverTimestamp();
      console.log('save :', info);

      return this.db.collection('users').add(info);
    }
  }
  deleteUser(id) {
    return this.db.doc(`users/${id}`).delete();
  }


}
