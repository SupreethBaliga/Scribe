import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comment: string = '';
  comments: any[];
  loggedIn = false;

// tslint:disable-next-line: no-input-rename
  @Input('postId') postId: string;
// tslint:disable-next-line: no-trailing-whitespace
  constructor(public ngZone: NgZone) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
   }

  ngOnInit() {
    console.log(this.postId);
    this.getComments();
  }


  postComment() {
    if (this.comment.length < 5) {
      return;
    }
    firebase.firestore().collection('comments').add({
      text: this.comment,
      post: this.postId,
      owner: firebase.auth().currentUser.uid,
      ownerName: firebase.auth().currentUser.displayName,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data) => {
      console.log('Comment is saved');
      this.getComments();
    }).catch((error) => {
      console.log(error);
    });
  }

  getComments() {
    this.comments = [];
    firebase.firestore().collection('comments').where('post', '==', this.postId).orderBy('created', 'desc').get().then((data) => {
      data.docs.forEach((commentRef) => {
        this.ngZone.run(() => {
          this.comments.push(commentRef.data());
        });
      });
      }).catch((error) => {
        console.log(error);
    });
  }

}
