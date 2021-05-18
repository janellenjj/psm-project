import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

	user:any
  linkList = []

  constructor(private afs:AngularFirestore) {
  	if(localStorage.getItem('userData')){
  		this.user = JSON.parse(localStorage.getItem('userData'))
      this.updateUser();
  	}
  }

  updateUser(){

    let sub

    switch (this.user.role) {
      case "student":
      sub = this.afs.collection('student', ref => ref.where('username','==',this.user.username)).valueChanges({idField:'userId'}).subscribe( value => {
        if(value[0]){
          sub.unsubscribe();
          this.user = value[0]
          this.user.role = 'student'
          localStorage.setItem('userData',JSON.stringify(this.user))

            this.linkList = [
                {
                  path:'student',
                  label:'Student'
                }
            ]

        }
      })
      break;

      case "lecturer":
      sub = this.afs.collection('lecturer', ref => ref.where('username','==',this.user.username)).valueChanges({idField:'userId'}).subscribe( value => {
        if(value[0]){
          sub.unsubscribe();
          this.user = value[0]
          this.user.role = 'lecturer'
          localStorage.setItem('userData',JSON.stringify(this.user))

          if(this.user.committee){
             this.linkList = [

                
                {
                  path:'lecturer',
                  label:'Lecturer List'
                },
                {
                  path:'student-list',
                  label:'Student List'
                },
                {
                  path:'supervisor',
                  label:'Supervior Application'
                },
                {
                  path:'proposal-list',
                  label:'Proposal List'
                },
                

            ]
          }else{
            this.linkList = [

                
                {
                  path:'student-list',
                  label:'Student List'
                },
                {
                  path:'proposal-list',
                  label:'Proposal List'
                }
                

            ]
          }
          
        }
      })
      break;

      case "admin":
      sub = this.afs.collection('user', ref => ref.where('username','==',this.user.username)).valueChanges({idField:'userId'}).subscribe( value => {
        if(value[0]){
          sub.unsubscribe();
          this.user = value[0]
          this.user.role = 'admin'
          localStorage.setItem('userData',JSON.stringify(this.user))

            this.linkList = [
                {
                  path:'program',
                  label:'Manage Program'
                },
                {
                  path:'lecturer',
                  label:'Manage Lecturer'
                }
            ]

        }
      })
      break;
      
      default:
      // code...
      break;
    }


  }

}
