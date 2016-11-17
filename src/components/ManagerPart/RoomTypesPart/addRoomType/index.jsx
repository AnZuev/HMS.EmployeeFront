import * as React from 'react';


export class AddRoomTypeBlock extends React.Component {
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

	getDataFromInput(){
		return {
			name: $("#RoomTypePart__addRoomTypeBlock__titleInput").val(),
			description: $("#RoomTypePart__addRoomTypeBlock__descriptionInput").val(),
			photoPath: $("#RoomTypePart__addRoomTypeBlock__photoPathInput").val(),
			cost: $("#RoomTypePart__addRoomTypeBlock__costInput").val()
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


	render() {

		if(this.state.hidden){
			return null;
		}


		return (
			<div className="RoomTypePart__addRoomTypeBlock">
				<div>
					<p className="text-danger text-xs-center">{this.state.commonError}</p>
					<p>
						<b>Title: </b> <input type="text" className="form-control" id="RoomTypePart__addRoomTypeBlock__titleInput"/>
						<span className="small text-danger">{this.state.errors.name}</span>
					</p>

					<p>
						<b>Description: </b> <textarea type="text" className="form-control" id="RoomTypePart__addRoomTypeBlock__descriptionInput" rows="4"></textarea>
						<span className="small text-danger">{this.state.errors.description}</span>
					</p>
					<p>
						<b>Cost: </b><input type="number"  className="form-control" id="RoomTypePart__addRoomTypeBlock__costInput"/>
						<span className="small text-danger">{this.state.errors.cost}</span>
					</p>

					<p>
						<b>Photo: </b><input type="text"  className="form-control" id="RoomTypePart__addRoomTypeBlock__photoPathInput"/>
						<span className="small text-danger">{this.state.errors.photoPath}</span>
					</p>
					<button className="btn btn-md btn-success btn-block" type='submit' onClick={this.handleSaveClick}>Save</button>
				</div>
			</div>
		)
	}

}



