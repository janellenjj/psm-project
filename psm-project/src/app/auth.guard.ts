import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(public userService:UserServiceService,private router:Router) {
		// code...
	}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
  	console.log(this.userService.user);

    if(this.userService.user){
    	if(state.url == '/home'){

    		switch (this.userService.user.role) {
    			case "admin":
    				this.router.navigate(['/program'])
    				break;

    			case "lecturer":
    				if(this.userService.user.committee){
						this.router.navigate(['./lecturer'])
					}else{
						this.router.navigate(['./student-list'])
					}
    				break;

    			case "student":
    				this.router.navigate(['/student'])
    				break;
    		}

  			return false;
  		}else{
  			return true
  		}

    }else{
    	this.router.navigate(['/home'])
    	return false
    }
  }
  
}
