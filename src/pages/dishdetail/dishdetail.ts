import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Dish} from '../../shared/dish';
import {Comment} from '../../shared/comment';
import {FavouriteProvider} from '../../providers/favourite/favourite'
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
  }
}
