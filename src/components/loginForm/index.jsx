import * as React from 'react';


export class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			mailError: "",
			passwordError: "",
			commonError: this.props.message || ""
		}
	}

	clearErrors(){
		this.setState({
			mailError: "",
			passwordError: "",
			commonError: ""
		})

	}

	showError(fieldError){

		if(fieldError.field == "password"){
			this.setState({
				passwordError: fieldError.message
			})
		}else if(fieldError.field == "mail") {
			this.setState({
				mailError: fieldError.message
			});
		}
	}

	handleClick(){
		let url = window.host + '/auth/login';
		let mail = $('#login-form__mail').val();
		let password = $('#login-form__password').val();

		this.clearErrors();

		window.authController.setAuthData(mail, password);
		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(window.authController.getAuthData())
		}).then((response)=>{
			if(response.status <= 401){
				return response.json()
					.then((json) => {
						if(response.status == 200){
							this.setState({
								status: "loaded"
							});
							window.authController.setUserData(json);
							window.page.updateAuth();
						}else if(response.status == 400) {
							json.fieldErrors.forEach((fieldError) => {
								this.showError(fieldError);
							})
						}else if(response.status == 401){
							this.setState({
								commonError: json.commonErrors[0]
							})
						}
					})
			}else{
				console.log("server error");
				//server error happened, need to be somehow handled
				new Error({exception: true, type: "Server Error"});
			}
		}).catch((err) =>{
			this.setState({
				commonError: "Something went wrong. Reload page and try again"
			});
			console.log(err);
		});
	}

	submit(e) {
		e.preventDefault();
	}

	render() {
		return 	(
				<form className="login-form form-horizontal loginForm" onSubmit={this.submit}>
					<p className="text-danger text-xs-center">{this.state.commonError}</p>
					<div className="form-group">
						<label htmlFor="login-form__mail">Email address</label>
						<input type="email" className="form-control" id="login-form__mail" placeholder="Your mail" />
						<span className="small text-danger">{this.state.mailError}</span>
					</div>
					<div className="form-group">
						<label htmlFor="login-form__password">Password</label>
						<input type="password" className="form-control" id="login-form__password" placeholder="Password..." />
						<span className="small text-danger">{this.state.passwordError}</span>
					</div>
					<button className="btn btn-lg btn-success btn-block" onClick={this.handleClick}>Sign In</button>
				</form>)
	}

}



