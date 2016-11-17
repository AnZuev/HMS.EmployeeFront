import * as React from 'react';

import {RoomItem} from "./Room/index.jsx"
import {AddRoomBlock} from "./addRoom/index.jsx"

export class RoomsPart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hidden: false,
			rooms: [],
			status: "showRooms"
		};
		this.loadRooms();
		this.openAddRoom = this.openAddRoom.bind(this);
		this.openShowRooms = this.openShowRooms.bind(this);
	}

	hide(){
		this.setState({hidden: true});
	}

	show(){
		this.setState({hidden: false});
	}

	loadRooms() {
		let url = window.host + '/private/room/all';

		fetch(url, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}).then((response)=> {
			if (response.status == 200) {
				return response.json()
					.then((json) => {
						this.setState({
							rooms: json
						});
					})
			} else if(response.status == 204) {
				this.setState({
					rooms: []
				});
			}else{
				//server error happened, need to be somehow handled
				new Error({exception: true, type: "Server Error"});
			}
		}).catch((err) => {
			console.log(err);
		});
	}

	openAddRoom(){
		this.setState({
			status: "addRoom"
		})
	}

	openShowRooms(){
		this.setState({
			status: "showRooms",
			rooms: []
		});
		this.loadRooms();
	}

	renderShowRooms(){
		let block = [];

		this.state.rooms.forEach(room => {
			block.push(<RoomItem key={room.id} parent={this} room={room} />);
		});
		return 	(
			<div id="ManagerPart__RoomTypePage" >
				<p className="text-primary" style={{'textAlign': 'center'}}>
					<button className="btn btn-md btn-success" onClick={this.openAddRoom}>
						Add room
					</button>
				</p>
				{block}
			</div>
		)
	}

	renderAddRoom(){
		return 	(
			<div id="ManagerPart__RoomTypePage" >
				<p className='RoomTypePage__goToShowRoomTypesButton' onClick={this.openShowRooms}>Back</p>
				<AddRoomBlock parent={this} />
			</div>
		)
	}
	render(){
		if(this.state.hidden){
			return null;
		}

		if(this.state.status == 'showRooms'){
			return this.renderShowRooms();
		}else{
			return this.renderAddRoom();
		}
	}

}



