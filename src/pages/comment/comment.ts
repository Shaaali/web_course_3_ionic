import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators,FormBuilder, FormGroup} from '@angular/forms';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  comment: FormGroup;
  commentsub : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController,
    private formBuilder: FormBuilder) {
      this.comment = this.formBuilder.group({
        author :['',Validators.required],
        rating : [1,Validators.required],
        comment: ['',Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
 dismiss(){
   this.viewCtrl.dismiss();
 }
 onSubmit(commentsub){
   let date = new Date();
   let dateformated = date.toISOString();
   this.commentsub = this.comment.value;
   this.commentsub.date = dateformated;
   this.viewCtrl.dismiss(this.commentsub);
   this.comment.reset();

  console.log(this.comment.value);
}
}
