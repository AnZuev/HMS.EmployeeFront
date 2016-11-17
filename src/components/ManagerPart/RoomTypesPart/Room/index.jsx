import * as React from 'react';


export class RoomItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roomType: this.props.roomType,
			status:{
				editable: false
			},
			errors:{

			},
			commonError: ""
		};
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleSaveClick = this.handleSaveClick.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
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
			name: $("#RoomItem__titleInput").val(),
			description: $("#RoomItem__descriptionInput").val(),
			photoPath: $("#RoomItem__photoPathInput").val(),
			cost: $("#RoomItem__costInput").val(),
			id: this.state.roomType.id
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

		let url = window.host + '/private/roomtype/update';

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
					roomType:{
						title: data.name,
						cost: data.cost,
						description: data.description,
						photoPath: data.photoPath,
						id: data.id
					},
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
		});
	}

	handleEditClick(){
		this.makeEditable();
	}

	handleDeleteClick(){

		let url = window.host + '/private/roomtype/delete';

		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				roomTypeId: this.state.roomType.id
			})
		}).then((response)=>{
			if(response.status == 200){
				this.props.parent.openShowRoomTypes();
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

	renderEditable(){
		return (
			<div className="RoomItem">
				<div>
					<p className="text-danger text-xs-center">{this.state.commonError}</p>
					<br/>
					<span><b>Id: </b>{this.state.roomType.id}</span>
					<p>
						<b>Title: </b> <input type="text" className="form-control" id="RoomItem__titleInput" defaultValue={this.state.roomType.title}/>
						<span className="small text-danger">{this.state.errors.name}</span>
					</p>

					<p>
						<b>Description: </b> <textarea type="text" className="form-control" id="RoomItem__descriptionInput" rows="4">{this.state.roomType.description}</textarea>
						<span className="small text-danger">{this.state.errors.description}</span>
					</p>
					<p>
						<b>Cost: </b><input type="number"  className="form-control" id="RoomItem__costInput" defaultValue={this.state.roomType.cost}/>
						<span className="small text-danger">{this.state.errors.cost}</span>
					</p>

					<p>
						<b>Photo: </b><input type="text"  className="form-control" id="RoomItem__photoPathInput" defaultValue={this.state.roomType.photoPath}/>
						<span className="small text-danger">{this.state.errors.photoPath}</span>
					</p>
					<button className="btn btn-md btn-success btn-block" type='submit' onClick={this.handleSaveClick}>Save</button>
				</div>
			</div>
		)
	}

	renderUneditable(){
		return 	(
			<div className="RoomItem">
				<p className="h3">{this.state.roomType.title}:</p>
				<img src={this.state.roomType.photoPath} className= "img-rounded RoomItem__photo" alt=""/>
				<br/>
				<span><b>Id: </b>{this.state.roomType.id}</span>
				<br/>
				<span className="RoomItem__text">
					<b>Description: </b>{this.state.roomType.description}
				</span>
				<br/>
				<span><b>Cost: </b>{this.state.roomType.cost}$</span>
				<br/>
				<p className="text-primary text-xs-left">
					<button className="btn btn-md btn-danger pull-right left-margin-10" onClick={this.handleDeleteClick}>
						Delete
					</button>
					<button className="btn btn-md btn-primary pull-right" onClick={this.handleEditClick}>
						Edit
					</button>
				</p>
				<div className="clearfix"></div>
			</div>
		)
	}
	render() {
		if(this.state.status.editable){
			return this.renderEditable();
		}else{
			return this.renderUneditable();
		}

	}

}



