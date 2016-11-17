import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Menu} from '../../components/ManagerPart/menu/index.jsx';
import {HotelPage} from "../../pages/HotelPage/index.jsx";
import {OrdersBlock} from "../../components/ManagerPart/OrdersBlock/index.jsx"
import {RoomTypePart} from "../../components/ManagerPart/RoomTypesPart/index.jsx";
import {RoomsPart} from "../../components/ManagerPart/RoomsPart/index.jsx";


export class ManagersPartPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentPage: this.props.state,
			authorized: window.authController.isAuthorized()
		};
		this.children = {};
		this.changeState = this.changeState.bind(this);
	}

	updateAuth(){
		this.setState({authorized: window.authController.isAuthorized()});
	}


	render(){

		var lymbdaMenu = (child)=>{
			if(child){
				this.menu = child;
			}
		};
		let block;
		switch (this.state.currentPage){
			case "myHotel":
				block = <HotelPage />;
				break;
			case "orders":
				block = <OrdersBlock />;
				break;
			case "rooms":
				block = <RoomsPart />;
				break;
			case "roomTypes":
				block = <RoomTypePart />;
				break;
		}

		return (
			<div>
				<Menu pageController = {this} ref = {lymbdaMenu} isAuthorized = {window.authController.isAuthorized()} />
				{block}
			</div>
		);

	}

	changeState(page){
		this.setState({currentPage: page});
	}


}





