import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {ManagerItem} from "./ManagerItem/index.jsx"
import {AddManagerBlock} from "./addManager/index.jsx"

export class ManagersList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "showManagers",
			managers: [],
			title: "managers"
		};
		this.parent = this.props.parent;

		this.openAddManager = this.openAddManager.bind(this);
		this.openShowManagers = this.openShowManagers.bind(this);
		this.loadManagers();
	}



	openAddManager(){
		this.setState({
			status: 'addManager'
		})
	}

	openShowManagers(){
		this.loadManagers();
		this.setState({
			status: 'showManagers'
		})
	}


	loadManagers(){
		fetch(window.host + '/private/owner/employees/all', {
			method: "get",
			credentials: 'include'
		}).then((response)=>{

			if(response.status == 200){
				return response.json();
			}
		}).then((json)=>{
			this.setState({managers: json});
		}).catch((err)=>{
			console.log(err);
		});
	}


	render() {

		if(this.state.status == "addManager"){
			return (
				<div className="page OwnersList">
					<p className='OwnersList__goToShowManagersButton' onClick={this.openShowManagers}> Back to list of managers</p>
					<AddManagerBlock parent = {this} />
				</div>
			)
		}else{
			let block = [];
			this.state.managers.forEach(manager =>{
				block.push(<ManagerItem manager={manager} parent={this}/>);
			});

			return (
				<div className="page OwnersList">
					<p className="text-primary" style={{'textAlign': 'center'}}>
						<button className="btn btn-md btn-success" onClick={this.openAddManager}>
							Add manager
						</button>
					</p>
					{(block.length > 0) ?
						block
						:
						<p className="text-muted OwnersList__noManagersFound" style={{'textAlign': 'center'}}>You have no managers in your hotel</p>
					}
				</div>
			)
		}

	}

}



