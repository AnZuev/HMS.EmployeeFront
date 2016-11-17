import * as React from 'react';


export class RoomItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			room: this.props.room,
			roomTypes: [],
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
		});
		this.loadRoomTypes();
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
			roomNumber: $("#RoomItem__roomNumberInput").val(),
			status: $("#RoomItem__statusInput").val(),
			typeID: $("#RoomItem__typeInput").val(),
			id: this.state.room.id
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

		let url = window.host + '/private/room/update';

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
					status: {
						editable: false
					}
				});
				this.props.parent.openShowRooms();
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
					<span><b>Id: </b>{this.state.room.id}</span>
					{this.renderRoomTypeDropDown()}
					<p>
						<b>Status: </b> <br/>
						<select type="text" className="form-control" id="RoomItem__statusInput">
							<option value="WORKED" selected>Ok</option>
							<option value="NOT_WORKED">Temporary unavailable</option>
						</select>
					</p>

					<p>
						<b>Room number: </b><input type="number"  className="form-control" id="RoomItem__roomNumberInput" defaultValue={this.state.room.roomNumber}/>
						<span className="small text-danger">{this.state.errors.roomNumber}</span>
					</p>

					<button className="btn btn-md btn-success btn-block" type='submit' onClick={this.handleSaveClick}>Save</button>
				</div>
			</div>
		)
	}

	renderUneditable(){
		return 	(
			<div className="RoomItem">
				<p className="h3">{this.state.room.typeName}:</p>
				<br/>
				<span><b>Id: </b>{this.state.room.id}</span>
				<br/>
				<span className="RoomItem__text">
					<b>Status: </b>{(this.state.room.status == "WORKED") ? "Ok" : "Temporary unavailable"}
				</span>
				<br/>
				<span><b>Cost: </b>{this.state.room.cost}$</span>
				<br/>
				<span><b>Room number: </b>{this.state.room.roomNumber}</span>
				<br/>
				<p className="text-primary text-xs-left">

					<button className="btn btn-md btn-primary pull-right" onClick={this.handleEditClick}>
						Edit
					</button>
				</p>
				<div className="clearfix"></div>
			</div>
		)
	}

	loadRoomTypes(){
		fetch(window.host + "/private/roomtype/all", {
			method: "get",
			credentials: "include"
		}).then((response)=>{
			if(response.status == 200){
				return response.json();
			}
		}).then((json)=>{
			this.setState({
				roomTypes: json
			});

		}).catch((err)=>{
			console.log(err);
		});
	}

	renderRoomTypeDropDown(){
		let opt = [];

		this.state.roomTypes.forEach((roomType)=>{
			let t;
			if(this.state.room.typeName == roomType.title){
				t = (<option key={roomType.id} value={roomType.id} selected> {roomType.title} </option>)
			}else{
				t = (<option key={roomType.id} value={roomType.id} > {roomType.title} </option>)
			}
			opt.push(t);
		});

		return (<div className="form-group">
			<label htmlFor="RoomItem__typeInput"><b>Room type:</b></label>
			<select className="form-control" id="RoomItem__typeInput" default="Choose room type...">
				{opt}
			</select>
		</div>)
	}

	render() {
		if(this.state.status.editable){
			return this.renderEditable();
		}else{
			return this.renderUneditable();
		}

	}

}



