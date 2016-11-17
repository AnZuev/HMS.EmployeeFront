import * as React from 'react';


export class AddRoomBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hidden: this.props.hidden,
			errors: {},
			commonError: "",
			roomTypes:[]
		};
		this.handleSaveClick = this.handleSaveClick.bind(this);
		this.loadRoomTypes();
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

	getDataFromInput(){
		return {
			roomNumber: $("#RoomItem__roomNumberInput").val(),
			status: $("#RoomItem__statusInput").val(),
			typeID: $("#RoomItem__typeInput").val()
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
			opt.push(<option key={roomType.id} value={roomType.id} > {roomType.title} </option>);
		});

		return (<p className="form-group">
			<label htmlFor="RoomItem__typeInput"><b>Room type:</b></label>
			<select className="form-control" id="RoomItem__typeInput" >
				<option value="" selected disabled>Select room type...</option>
				{opt}
			</select>
		</p>)
	}

	render() {

		if(this.state.hidden){
			return null;
		}

		return (
			<div className="RoomPart__addRoomBlock">
				<div>
					<p className="text-danger text-xs-center">{this.state.commonError}</p>
					<br/>
					{this.renderRoomTypeDropDown()}
					<p>
						<b>Status: </b> <br/>
						<select type="text" className="form-control" id="RoomItem__statusInput">
							<option value="WORKED" selected>Ok</option>
							<option value="NOT_WORKED">Temporary unavailable</option>
						</select>
					</p>

					<p>
						<b>Room number: </b><input type="number"  className="form-control" id="RoomItem__roomNumberInput"/>
						<span className="small text-danger">{this.state.errors.roomNumber}</span>
					</p>

					<button className="btn btn-md btn-success btn-block" type='submit' onClick={this.handleSaveClick}>Save</button>
				</div>
			</div>
		)
	}

}



