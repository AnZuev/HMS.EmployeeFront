import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Menu} from '../../components/OwnerPart/menu/index.jsx';
import {ManagersList} from "../../components/OwnerPart/OwnersList/index.jsx";
import {HotelPage} from "../../pages/HotelPage/index.jsx";

export class OwnerPartPage extends React.Component{
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
		var lymbda = (child)=>{
			if(child){
				this.children[child.state.title] = child;
			}
		};
		var lymbdaMenu = (child)=>{
			if(child){
				this.menu = child;
			}
		};
		let block;
		if(this.state.currentPage == "managers"){
			block = <ManagersList ref={lymbda}/>;
		}else {
			block = <HotelPage ref={lymbda}/>;
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





