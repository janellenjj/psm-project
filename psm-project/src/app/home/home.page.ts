import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserServiceService } from '../user-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	usernameInput:String
	passwordInput:String

	loginMode:any = 'student'

	constructor(private afs:AngularFirestore, public userService:UserServiceService, public router:Router) {}

	login(){

		let loginSub;

		switch(this.loginMode){
			case 'admin':
				loginSub = this.afs.collection('user', ref => ref.where('username','==',this.usernameInput)).valueChanges({idField:'userId'}).subscribe( (value:any) => {

					if(value){
						if(value[0].password == this.passwordInput){
							loginSub.unsubscribe();
							this.userService.user = value[0];
							this.userService.user.role = 'admin';
							this.userService.updateUser();
							localStorage.setItem('userData', JSON.stringify(this.userService.user))
							this.router.navigate(['./program'])
						}

					}
				})
			break;

			case 'lecturer':
				loginSub = this.afs.collection('lecturer', ref => ref.where('username','==',this.usernameInput)).valueChanges({idField:'userId'}).subscribe( (value:any) => {

					if(value){
						if(value[0].password == this.passwordInput){
							loginSub.unsubscribe();
							this.userService.user = value[0];
							this.userService.user.role = 'lecturer';
							this.userService.updateUser();
							localStorage.setItem('userData', JSON.stringify(this.userService.user))
							if(this.userService.user.committee){
								this.router.navigate(['./lecturer'])
							}else{
								this.router.navigate(['./student-list'])
							}
						}

					}
				})
			break;

			case 'student':
				loginSub = this.afs.collection('student', ref => ref.where('username','==',this.usernameInput)).valueChanges({idField:'userId'}).subscribe( (value:any) => {

					if(value){
						if(value[0].password == this.passwordInput){
							loginSub.unsubscribe();
							this.userService.user = value[0];
							this.userService.user.role = 'student';
							this.userService.updateUser();
							localStorage.setItem('userData', JSON.stringify(this.userService.user))
							this.router.navigate(['./student'])
						}

					}
				})

			break;
		}

		
	}

}
