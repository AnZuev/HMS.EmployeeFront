import * as React from 'react';

import {RoomItem} from "./Room/index.jsx"
import {AddRoomTypeBlock} from "./addRoomType/index.jsx"

export class RoomTypePart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hidden: false,
			roomTypes: [],
			status: "showRoomTypes"
		};
		this.loadRoomTypes();
		this.openAddRoomType = this.openAddRoomType.bind(this);
		this.openShowRoomTypes = this.openShowRoomTypes.bind(this);
	}

	hide(){
		this.setState({hidden: true});
	}

	show(){
		this.setState({hidden: false});
	}

	loadRoomTypes() {
		let url = window.host + '/private/roomtype/all';

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
							roomTypes: json
						});
					})
			} else if(response.status == 204) {
				this.setState({
					roomTypes: []
				});
			}else{
				//server error happened, need to be somehow handled
				new Error({exception: true, type: "Server Error"});
			}
		}).catch((err) => {
			console.log(err);
		});
	}

	openAddRoomType(){
		this.setState({
			status: "addRoomType"
		})
	}

	openShowRoomTypes(){
		this.setState({
			status: "showRoomTypes"
		})
		this.loadRoomTypes();
	}

	renderShowRoomTypes(){
		let block = [];

		this.state.roomTypes.forEach(roomType => {
			block.push(<RoomItem key={roomType.id} parent={this} roomType={roomType} />);
		});
		return 	(
			<div id="ManagerPart__RoomTypePage" >
				<p className="text-primary" style={{'textAlign': 'center'}}>
					<button className="btn btn-md btn-success" onClick={this.openAddRoomType}>
						Add room type
					</button>
				</p>
				{block}
			</div>
		)
	}

	renderAddRoomType(){
		return 	(
			<div id="ManagerPart__RoomTypePage" >
				<p className='RoomTypePage__goToShowRoomTypesButton' onClick={this.openShowRoomTypes}>Back</p>
				<AddRoomTypeBlock parent={this} />
			</div>
		)
	}
	render(){
		if(this.state.hidden){
			return null;
		}

		if(this.state.status == 'showRoomTypes'){
			return this.renderShowRoomTypes();
		}else{
			return this.renderAddRoomType();
		}
	}

}



