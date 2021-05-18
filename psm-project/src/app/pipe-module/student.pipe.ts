import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'student'
})
export class StudentPipe implements PipeTransform {

  transform(value: any, ...filters: any): any {

		let results = [];

		filters.forEach( _filter => {

			switch (_filter.field) {
				case "sem":

					let resultProgram = [];

					if(_filter.target == 'all'){
						resultProgram = value;
					}else{
						

						value.forEach( _student => {

							if(_student.sem == _filter.target){
								resultProgram.push(_student)
							}
						})

						
					}

					results.push(resultProgram)

				break;

				case "session":

					let resultSession = [];

					if(_filter.target == 'all'){
						resultSession = value;
					}else{
						

						value.forEach( _student => {

							if(_student.session == _filter.target){
								resultSession.push(_student)
							}
						})

						
					}

					results.push(resultSession)

				break;

				default:
				// code...
				break;
			}


		})

		let combinedResult = results[0];

		if(results.length > 1){
			for(let i=0;i<results.length;i++){
				combinedResult = this.intersect(combinedResult,results[i]);
			}	
		}

		console.log(combinedResult);



		return combinedResult;
	}

	intersect(a, b) {
		var setA = new Set(a);
		var setB = new Set(b);
		var intersection = new Set([...setA].filter(x => setB.has(x)));
		return Array.from(intersection);
	}
}
