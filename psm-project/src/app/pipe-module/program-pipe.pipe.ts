import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Pipe({
  name: 'programPipe',
  pure: false
})
export class ProgramPipePipe implements PipeTransform {

	allProgram:any

	constructor(private afs:AngularFirestore){

		this.allProgram = [];

		this.afs.collection('program').valueChanges({idField:'programId'}).subscribe( (value:any) => {
			if(value.length > 0){
		  		this.allProgram = [...value]
			}

	  	})
	}

  transform(value: any) : any {

    this.allProgram.forEach( _program => {
    	if(_program.programId == value){
    		console.log(_program)
    		return _program.name
    	}
    })
  }

}
