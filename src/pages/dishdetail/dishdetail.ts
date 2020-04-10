import { Component,Inject } from '@angular/core';
import {ModalController, ActionSheetController,ToastController,IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import {Dish} from '../../shared/dish';
import {FavouriteProvider} from '../../providers/favourite/favourite';
import {CommentPage} from '../../pages/comment/comment';
/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish:Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private toastCtrl : ToastController,
    private actionsheetCtrl: ActionSheetController,
    private modalCtrl : ModalController,
    private loadingCtrl: LoadingController, 
    private favoriteservice:FavouriteProvider) {
     this.dish = navParams.get('dish'); 
     this.favorite = this.favoriteservice.isFavorite(this.dish.id);
     this.numcomments = this.dish.comments.length;

     let total = 0;
     this.dish.comments.forEach(comment => total += comment.rating);
      this.avgstars = (total/this.numcomments).toFixed(2);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
  addToFavorites(){
    console.log('Adding to favorites',this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' +this.dish.id + 'added as a favourite succesfully',
      position:'middle',
      duration:3000
    }).present();
  }
    moreOptions(){
      console.log('more options selected');
      let actionsheet = this.actionsheetCtrl.create({
        title: 'More Options',
        buttons: [
          {
            text: 'Add to Favorites',
            handler: () => {
              console.log('Added to Favorites');
              this.addToFavorites();
              this.toastCtrl.create({
                message: 'Dish ' +this.dish.id + 'added as a favourite succesfully',
                position:'middle',
                duration:3000
              }).present();
            } 
          },
          {
            text: 'Comment',
            handler: () => {
              this.OpenComment();
              console.log('Comment added');
            } 
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancelled');
              
            } 
          },
        ]
      });
      actionsheet.present();
    }
    OpenComment(){
      let modal = this.modalCtrl.create(CommentPage);
      modal.present();
      modal.onDidDismiss(comment => {
        if(comment) {
          this.dish.comments.push(comment);
        }
      });
    }
}
