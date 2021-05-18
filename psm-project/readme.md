# get details from firebase

this.afs.collection('user').valueChanges({idField:'id'}).subscribe( (value:any) => {
	console.log(value)
})


# log in
login(){

	console.log(this.usernameInput, this.passwordInput)

	let loginSub = this.afs.collection('user', ref => ref.where('username','==',this.usernameInput)).valueChanges().subscribe( (value:any) => {

		if(value){

			console.log(value)

			loginSub.unsubscribe();

			value.forEach( user => {

				if(user.username == this.usernameInput){
					if(user.password == this.passwordInput){
						alert('Login Success')
					}
				}

			})

		}



	})


