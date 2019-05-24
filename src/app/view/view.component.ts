import { Component, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  post: any = {};
  postId: string = ''; 

  constructor(public activatedRoute: ActivatedRoute, public ngZone: NgZone) {

    firebase.firestore().settings({
      timestampsInSnapshots: true
    });


    let postId = this.activatedRoute.snapshot.paramMap.get('postId');
    firebase.firestore().collection('posts').doc(postId).get().then((docSnapshot) => {

      this.ngZone.run(() => {
        this.post = docSnapshot.data();
        console.log(this.post);
        this.postId = postId;
      });
    });
  }

  ngOnInit() {
  }

}
