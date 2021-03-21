import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, first, map, startWith, take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { UserPage } from '../user/user.page';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {
  // @ViewChild(IonSearchbar, { static: true }) searchBar: IonSearchbar;

  // users$: Observable<any>;
  searchControl : FormControl
  // items$ : Observable<User[]>
  userss: any;

  allUsers : Array<any>
  users :Array<any>

  searchFilter$ = new BehaviorSubject<string>('');

  constructor(private userService : UserService, private modalCtrl : ModalController, private db : AngularFirestore) {
    // this.searchControl = new FormControl();
    this.userService.getUsers().subscribe(res => {
      this.allUsers = res;
      this.users = res;
    })
    // const userss$ = this.db.collection<User>('users', ref => ref.orderBy('nom', 'asc')).valueChanges();
    // this.users$ = this.userService.getUsers();
    // console.log("this.users$", this.users$);


    // this.items$ = combineLatest([userss$, searchFilter$]).pipe(
    //   map(([clients, filter]) =>
    //     clients.filter(
    //       state =>
    //         state.nom.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    //     )
    //   )
    // );
  }

  async ngOnInit() {
    // console.log(this.users$);

    this.userss = await this.initializeUsers();
    // this.setFilteredItems('');
    // this.searchControl.valueChanges
    //   .pipe(debounceTime(700))
    //   .subscribe( search => {
    //     this.setFilteredItems(search);
    // })
  }

  async openUserModal(id) {
    const modal = await this.modalCtrl.create({
      component: UserPage,
      componentProps: {
        id
      }
    });
    await modal.present();
  }

  async createUser() {
    const modal = await this.modalCtrl.create({
      component: UserPage
    });
    await modal.present();
  }

  async initializeUsers() : Promise<any> {
    // let usersList = await this.db.collection('users').valueChanges().pipe().toPromise();
    let usersList = this.userService.getUsers();
    console.log("usersList", usersList);

    return usersList;
  }

  onInput(e) {
    var value = e.srcElement.value;
    // console.log(value);

    if (!value || value =='') {
      this.users = this.allUsers;
    }

    value = value.toLowerCase();

    this.users = this.allUsers.filter( user =>
      user.nom.toLowerCase().indexOf(value) > -1 ||
      user.email.toLowerCase().indexOf(value) > -1 ||
      user.role.toLowerCase().indexOf(value) > -1 ||
      user.prenom.toLowerCase().indexOf(value) > -1 )
  }

  // setFilteredItems(searchTerm) {
  //   this.users$ = this.filterItems(searchTerm);
  // }

  // filterItems(searchTerm) {
  //   return this.items.filter(item => {
  //     return item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  //   })
  // }

}
