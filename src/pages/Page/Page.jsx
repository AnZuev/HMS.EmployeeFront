import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {OwnerPartPage} from "../../pages/OwnerPart/OwnerPart.jsx";
import {LoginPage} from "../../pages/LoginPage/LoginPage.jsx";
import {ManagersPartPage} from "../ManagersPartPage/ManagersPart.jsx"

export class Page extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentPage: this.props.state,
			authorized: window.authController.isAuthorized()
		};
		window.page = this;
		this.children = {};
		//this.changeState = this.changeState.bind(this);

	}

	updateAuth(){
		this.setState({authorized: window.authController.isAuthorized()});
	}

	renderAuthorizedPage(lymbda){

		if(window.authController.getUserData().employeeType == "OWNER"){
			return <OwnerPartPage  ref={lymbda} state="managers"/>
		}else{
			return <ManagersPartPage ref={lymbda} state="myHotel" />
		}

	}

	render(){
		var lymbda = (child)=>{
			if(child){
				this.children[child.state.title] = child;
			}
		};

		return (
			<div className="container">
				{(!this.state.authorized ?
						<LoginPage ref = {lymbda}  pageController = {this} hidden={false} />
					:
						this.renderAuthorizedPage(lymbda)
				)}
			</div>
		)
	}

	/*changeState(page){
		let currentPage = this.children[this.state.currentPage];
		if(currentPage){
			currentPage.close();
		}
		let nextPage = this.children[page];
		if(nextPage){
			nextPage.open();
		}
		this.setState({currentPage: page});
	}*/


}





