import * as React from 'react';


export class ManagerItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.manager.id,
			mail: this.props.manager.mail,
			firstName: this.props.manager.firstName,
			secondName: this.props.manager.secondName,
			fatherName: this.props.manager.fatherName,
			status: {
				editable: false
			},
			errors:{

			}
		};
		this.parent = this.props.parent;

		this.handleClick = this.handleClick.bind(this);
		this.handleSaveClick = this.handleSaveClick.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
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


	handleClick(){
		this.makeEditable();
	}

	handleSaveClick(){
		let data = this.getDataFromInputs();
		console.log(data);
		let url = window.host + '/private/owner/employees/update';

		this.cleanErrors();
		fetch(url, {
			method: 'put',
			credentials: 'include',
			headers: new Headers({
				"Content-Type": "application/json"
			}),
			body: JSON.stringify(data)
		}).then((response)=>{
			if(response.status == 200){
				this.setState({
					firstName: data.firstName,
					secondName: data.secondName,
					fatherName: data.fatherName,
					mail: data.mail,
					id: data.id,
					status: {
						editable: false
					}
				})
			}else if(response.status == 400){
				return response.json()
					.then(json => {
						if(json.fieldErrors){
							this.showError(json.fieldErrors);
						}
					})
			}else{
				new Error();
			}
		}).catch((err) =>{
			this.setState({
				commonError: "Something went wrong. Reload page and try again"
			});
			throw err;
		});
	}

	makeEditable(){
		this.setState({
			status: {
				editable: true
			}
		})
	}

	makeUneditable(){
		this.setState({
			status: {
				editable: false
			}
		})
	}

	handleDeleteClick(){
		let data = {
			employeeId: this.state.id
		};
		console.log(data);
		let url = window.host + '/private/owner/employees/delete';

		this.cleanErrors();
		fetch(url, {
			method: 'post',
			credentials: 'include',
			headers: new Headers({
				"Content-Type": "application/json"
			}),
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
					})
			}else{
				new Error();
			}
		}).catch((err) =>{
			this.setState({
				commonError: "Something went wrong. Reload page and try again"
			});
			throw err;
		});
	}

	getDataFromInputs(){

		let data = {
			firstName: $("#ManagerItem__firstNameInput").val(),
			secondName: $("#ManagerItem__secondNameInput").val(),
			fatherName: $("#ManagerItem__fatherNameInput").val(),
			mail: $("#ManagerItem__mailInput").val(),
			id: this.state.id
		};
		let password = $("#ManagerItem__passwordInput").val();
		if(password.length > 0){
			data.password = password;
		}
		return data;
	}


	render() {
		if(this.state.status.editable){
			return 	(
				<div className="ManagerItem">
					<p className="h3">{this.state.firstName + " " + this.state.secondName }:</p>
					<hr/>
					<p >
						<b>id: </b> {this.state.id}
					</p>
					<p>
						<b>First name: </b> <input type="text" defaultValue={this.state.firstName} className="form-control" id="ManagerItem__firstNameInput"/>
						<span className="small text-danger">{this.state.errors.firstName}</span>
					</p>

					<p>
						<b>Last name: </b>
						<input type="text" defaultValue={this.state.secondName} className="form-control" id="ManagerItem__secondNameInput"/>
						<span className="small text-danger">{this.state.errors.secondName}</span>
					</p>

					<p>
						<b>Father name: </b>
						<input type="text" defaultValue={this.state.fatherName} className="form-control" id="ManagerItem__fatherNameInput"/>
						<span className="small text-danger">{this.state.errors.fatherName}</span>
					</p>

					<p>
						<b>Mail: </b>
						<input type="text" defaultValue={this.state.mail} className="form-control" id="ManagerItem__mailInput"/>
						<span className="small text-danger">{this.state.errors.email}</span>
					</p>

					<p>
						<b>Password: </b>
						<input type="password" className="form-control" id="ManagerItem__passwordInput"/>
						<span className="small text-danger">{this.state.errors.password}</span>
					</p>

					<p className="text-primary text-xs-left">
						<button className="btn btn-md btn-success pull-right" onClick={this.handleSaveClick}>
							Save
						</button>
					</p>
					<div className="clearfix"></div>
				</div>
			)
		}else{
			return 	(
				<div className="ManagerItem">
					<p className="h3">{this.state.firstName + " " + this.state.secondName }:</p>
					<hr/>
					<p >
						<b>id: </b> {this.state.id}
					</p>
					<p>
						<b>First name: </b> {this.state.firstName}
					</p>

					<p>
						<b>Last name: </b> {this.state.secondName}
					</p>

					<p>
						<b>Middle name: </b> {this.state.fatherName}
					</p>
					<p>
						<b>Mail: </b> {this.state.mail}
					</p>
					<p className="text-primary text-xs-left">
						<button className="btn btn-md btn-danger pull-right left-margin-10" onClick={this.handleDeleteClick}>
							Delete
						</button>
						<button className="btn btn-md btn-primary pull-right" onClick={this.handleClick}>
							Edit
						</button>
					</p>
					<div className="clearfix"></div>
				</div>
			)
		}

	}

}



