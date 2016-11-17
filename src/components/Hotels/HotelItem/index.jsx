import * as React from 'react';


export class HotelItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			title: this.props.title,
			description: this.props.description,
			phone: this.props.phoneNumber,
			address: this.props.address,
			mail: this.props.mail,
			status: {
				editable: false
			},
			errors:{

			}
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleSaveClick = this.handleSaveClick.bind(this);
	}


	handleClick(){
		this.makeEditable();
	}

	makeEditable(){
		this.setState({
			status:{
				editable: true
			}
		})
	}

	makeUneditable(){
		this.setState({
			status:{
				editable: false
			}
		})
	}

	getDataFromInput(){
		return {
			title: $("#HotelPage__addHotelBlock__titleInput").val(),
			description: $("#HotelPage__addHotelBlock__descriptionInput").val(),
			phoneNumber: $("#HotelPage__addHotelBlock__phoneInput").val(),
			mail: $("#HotelPage__addHotelBlock__mailInput").val(),
			address: $("#HotelPage__addHotelBlock__addressInput").val(),
			id: this.state.id
		};
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

	handleSaveClick(){
		let data = this.getDataFromInput();

		let url = window.host + '/private/owner/hotel/update';

		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(data)
		}).then((response)=>{
			if(response.status == 200){
				this.setState({
					title: data.title,
					phone: data.phoneNumber,
					mail: data.mail,
					address: data.address,
					description: data.description,
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
			console.log(err);
		});
	}

	render() {
		if(this.state.status.editable){
			return (<div className="" id="HotelPage__addHotelBlock">
				<div>
					<p className="text-danger text-xs-center">{this.state.commonError}</p>

					<p>
						<b>Title: </b> <input type="text" className="form-control" id="HotelPage__addHotelBlock__titleInput" defaultValue={this.state.title}/>
						<span className="small text-danger">{this.state.errors.title}</span>
					</p>

					<p>
						<b>Description: </b> <textarea type="text" className="form-control" id="HotelPage__addHotelBlock__descriptionInput" rows="4">{this.state.description}</textarea>
						<span className="small text-danger">{this.state.errors.description}</span>
					</p>
					<p>
						<b>Phone: </b> <input type="tel" className="form-control" id="HotelPage__addHotelBlock__phoneInput" defaultValue={this.state.phone}/>
						<span className="small text-danger">{this.state.errors.phoneNumber}</span>
					</p>
					<p>
						<b>E-mail: </b><input type="email"  className="form-control" id="HotelPage__addHotelBlock__mailInput" defaultValue={this.state.mail}/>
						<span className="small text-danger">{this.state.errors.mail}</span>
					</p>
					<p>
						<b>Address: </b> <input type="text" className="form-control" id="HotelPage__addHotelBlock__addressInput" defaultValue={this.state.address}/>
						<span className="small text-danger">{this.state.errors.address}</span>
					</p>
					<button className="btn btn-md btn-success btn-block" type='submit' onClick={this.handleSaveClick}>Save</button>
				</div>
			</div>);
		}else{
			return 	(
				<div className="HotelItem">
					<p className="h3">{this.state.title}:</p>
					<p className="HotelItem__text">
						{this.state.description}
					</p>
					<p className="text-primary">
						<b>Phone:</b> {this.state.phone}
						<br/>
						<b>Address:</b> {this.state.address}
						<br/>
						<b>Mail:</b> {this.state.mail}
						<br/>
					</p>
					{(window.authController.getUserData().employeeType == "OWNER") ?

						<p className="text-primary text-xs-left">
						<button className="btn btn-md btn-primary pull-right" onClick={this.handleClick}>
						Edit
						</button>
						</p>
						:
						""
					}
					<div className="clearfix"></div>
				</div>
			)
		}

	}

}



