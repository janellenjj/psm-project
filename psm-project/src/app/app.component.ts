import { Component } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {

	hideBar = false;

	constructor(public userService:UserServiceService, private afs:AngularFirestore, private route: Router, private router:ActivatedRoute) {
		

		this.route.events.pipe(
			filter(event => event instanceof NavigationEnd)
			).subscribe((event:any) => {
				console.log(event.url)
			if(event.url == '/home' || event.url=='/'){
				this.hideBar = true

			}else{
				this.hideBar = false
			}
		});
	}

	logout(){
		
		this.userService.user = {};
		this.userService.linkList = [];
		localStorage.clear();
		this.route.navigate(['/home'], {replaceUrl:true})

	}

}
