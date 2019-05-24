import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  posts: any = [];
  hobbies: any = [];

  constructor(public activatedRoute: ActivatedRoute) { 

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProfile(id);
    this.getUserPosts(id);

  }

  ngOnInit() {
  }

  getProfile(id: string) {


    firebase.firestore().collection('users').doc(id).get().then((documentSnapshot) => {
      this.user = documentSnapshot.data();
      this.user.displayName = this.user.firstName + ' ' + this.user.lastName;
      this.hobbies = this.user.hobbies.split(',');
      this.user.id = documentSnapshot.id;
      console.log(this.user);
    }).catch((error) => {
      console.log(error);
    });


  }

  getUserPosts(id: string) {
    firebase.firestore().collection('posts').where('owner', '==', id).get().then((data) => {
      this.posts = data.docs;
    }).catch((error) => {
      console.log(error);
    });
  }

}
