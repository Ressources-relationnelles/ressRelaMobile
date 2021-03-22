import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TypeRelationService {

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

  getTypeRelation() {
    return this.db.collection('typerelations').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...(data as {}) };
      })),
      takeUntil(this.ngUnsubscribe)
      );
    }

  getTypeRelatio(id) {
    return this.db.doc(`typerelations/${id}`).valueChanges().pipe(
      take(1)
      );
  }

  createOrUpdateTypeRelation(id=null, info: any) :Promise<any> {
    if (id) {
      return this.db.doc(`typerelations/${id}`).update(info);
    } else {
      // info['creator'] = this.auth.currentUser.value.id;
      // info['created'] = firebase.default.firestore.FieldValue.serverTimestamp();
      console.log('save :', info);

      return this.db.collection('typerelations').add(info);
    }
  }
  deleteTypeRelation(id) {
    return this.db.doc(`typerelations/${id}`).delete();
  }
}
