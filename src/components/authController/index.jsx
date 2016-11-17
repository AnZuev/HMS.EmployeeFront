
export class AuthController{
	constructor() {
		this.data = {};
		this.loadFromLocalStorage();
	}
	handleClick(){
		return false;
	}
	submit(e) {
		e.preventDefault();
	}

	setAuthData(mail, password){
		this.authData = {
			mail: mail,
			password: password
		};
		this.saveToLocalStorage();

	}

	getAuthData(){
		return this.authData;
	}

	setUserData(user){
		this.data.userData = user;
		this.data.userData.mail = this.authData.mail;
		this.data.authorized = true;
		this.saveToLocalStorage();
	}

	getUserData(){
		return this.data.userData;
	}

	isAuthorized(){
		return this.data.authorized;
	}

	saveToLocalStorage(){
		window.localStorage.setItem("data", JSON.stringify(this.data));
	}

	cleanLocalStorage(){
		window.localStorage.removeItem("data");
		this.data = {};
	}

	loadFromLocalStorage(){
		let data = window.localStorage.getItem('data');
		if(data) {
			this.data = JSON.parse(data);
		}
	}

	setToPage(page){
		this.data.history.to = page;
	}

	getToPage(){
		return this.data.history.to;
	}






}



