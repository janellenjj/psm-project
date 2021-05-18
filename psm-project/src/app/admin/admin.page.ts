import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

	newUsernameInput:any
	newPasswordInput:any
	newNameInput:any
	

	userList:any = []

  constructor(private afs:AngularFirestore, public router:Router) { }

  addUser(){
  	
  	this.afs.collection('user').add({
  		name:this.newNameInput,
  		username:this.newUsernameInput,
  		password:this.newPasswordInput
  	}).then( () => {
  		alert("add success!")
  	})
  }

  ngOnInit() {
  }

  ionViewDidEnter(){  //no matter what will first show this
  	console.log('auto run');

  	this.afs.collection('user').valueChanges({idField:'userid'}).subscribe( (value:any) => {
  		this.userList=value;
  	})


  }

}
