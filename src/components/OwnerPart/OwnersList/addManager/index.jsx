import * as React from 'react';


export class AddManagerBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hidden: this.props.hidden,
			errors: {},
			commonError: ""
		};
		this.handleSaveClick = this.handleSaveClick.bind(this);
	}


	show(){
		this.setState({
			hidden: false
		})
	}

	hide(){
		this.setState({
			hidden: true
		})
	}

	getDataFromInputs(){
		return {
			firstName: $("#OwnerPart__addManagerBlock__firstNameInput").val(),
			secondName: $("#OwnerPart__addManagerBlock__secondNameInput").val(),
			fatherName: $("#OwnerPart__addManagerBlock_fatherNameInput").val(),
			mail: $("#OwnerPart__addManagerBlock__mailInput").val(),
			phoneNumber: $("#OwnerPart__addManagerBlock__phoneNumberInput").val(),
			password: $("#OwnerPart__addManagerBlock__passwordInput").val()
		}
	}


	showError(errors){
		let errorObj = {};
		errors.forEach(error => {
			errorObj[error.field] = error.message;
		});
		this.setState({
			errors: errorObj
		})
	}

	cleanErrors(){
		this.setState({
			errors: {}
		})
	}

	handleSaveClick(){
		let data = this.getDataFromInputs();

		let url = window.host + '/private/owner/employees/update';


		this.cleanErrors();

		fetch(url, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(data)
		}).then((response)=>{
			if(response.status == 200){
				this.props.parent.openShowManagers();
			}else if(response.status == 400){
				return response.json()
					.then(json => {
						if(json.fieldErrors){
							this.showError(json.fieldErrors);
						}
						if(json.commonErrors){
							this.setState({
								commonError: json.commonErrors[0]
							})
						}
					})
			}else{
				new Error();
			}
		}).catch((err) =>{
			this.setState({
				commonError: "Something went wrong. Reload page and try again"
			});
		});
	}

	render() {
		if(this.state.hidden){
			return null;
		}


		return (<div id="OwnerPart__addManagerBlock">
			<div>
				<p className="text-danger text-xs-center">{this.state.commonError}</p>

				<p>
					<b>First name: </b> <input type="text" className="form-control" id="OwnerPart__addManagerBlock__firstNameInput"/>
					<span className="small text-danger">{this.state.errors.firstName}</span>
				</p>

				<p>
					<b>Second name: </b> <input type="text" className="form-control" id="OwnerPart__addManagerBlock__secondNameInput"/>
					<span className="small text-danger">{this.state.errors.secondName}</span>
				</p>

				<p>
					<b>Middle name: </b> <input type="text" className="form-control" id="OwnerPart__addManagerBlock_fatherNameInput"/>
					<span className="small text-danger">{this.state.errors.fatherName}</span>
				</p>

				<p>
					<b>Phone: </b><input type="tel"  className="form-control" id="OwnerPart__addManagerBlock__phoneNumberInput"/>
					<span className="small text-danger">{this.state.errors.phone}</span>
				</p>

				<p>
					<b>E-mail: </b><input type="email"  className="form-control" id="OwnerPart__addManagerBlock__mailInput"/>
					<span className="small text-danger">{this.state.errors.mail}</span>
				</p>

				<p>
					<b>Password: </b> <input type="password" className="form-control" id="OwnerPart__addManagerBlock__passwordInput"/>
					<span className="small text-danger">{this.state.errors.password}</span>
				</p>
				<button className="btn btn-md btn-success btn-block" type='submit' onClick={this.handleSaveClick}>Create</button>
			</div>
		</div>);
	}

}



