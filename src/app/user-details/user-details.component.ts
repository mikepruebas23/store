import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { RateService } from './user-details.service';
import { ReactionService } from './reaction.service';
import * as _ from "lodash";
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy  {

  
  showEmojis = false;
  emojiList: string[];
  reactionCount: any;
  userReaction: any;
  subscription: any;
  
  UID: string = this._ActivatedRoute.snapshot.params.id;
  POS: string = this._ActivatedRoute.snapshot.params.pos;
  itemId: string = this.UID;
  userData: any;

  user = { 
    displayName: "",
    email: "",
    emailVerified: true,
    main: "",
    position: this.POS,
    rnkPoints: 0,
    role: "SUSCRIPTOR",
    photoURL: '',
    secondary: "",
    switchCode: "",
    state:"",
    tagName: "",
    uid: this.UID,
  }
  
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _AuthService: AuthService,
    private reactionSvc: ReactionService,
    ) { }

  ngOnInit() {

    //REACTION SERVICE
    this.emojiList = this.reactionSvc.emojiList;
    this.subscription = this.reactionSvc.getReactions(this.itemId).valueChanges().subscribe(reactions => {

      this.reactionCount = this.reactionSvc.countReactions(reactions);
      this.userReaction  = this.reactionSvc.userReaction(reactions);

    })

    this._AuthService.getUsers2(this.UID).valueChanges().subscribe(
      res => { 
        // console.log('USUARIO: ', res);
        this.user.displayName = res.displayName,
        this.user.tagName = res.tagName,
        this.user.main = res.main,
        this.user.secondary = res.secondary,
        this.user.state = res.state,
        this.user.switchCode = res.switchCode,
        this.user.rnkPoints = res.rnkPoints,
        this.user.photoURL = res.photoURL
        this.user.email = res.email;
      });

  }
  react(val) {
    if (this.userReaction === val) {
      this.reactionSvc.removeReaction(this.itemId)
    } else {
      this.reactionSvc.updateReaction(this.itemId, val)
    }
  }

  toggleShow() {
    this.showEmojis = !this.showEmojis
  }


  emojiPath(emoji) {
   return `assets/reactions/${emoji}.svg`
  }

  hasReactions(index) {
    // return _.get(this.reactionCount, index.toString())
    return _.get(this.reactionCount, index.toString())
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  showIcons(){
    this.showEmojis = !this.showEmojis;
  }

}
