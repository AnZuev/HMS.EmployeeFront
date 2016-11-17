import * as React from 'react';
import * as ReactDOM from 'react-dom';



export class Menu extends React.Component{
	ordersClickHandler(){
		this.sendCommandToParent("orders");
	}

	roomsClickHandler(){
		this.sendCommandToParent("rooms");
	}

	roomTypesClickHandler(){
		this.sendCommandToParent("roomTypes");
	}


	myHotelClickHandler(){
		this.sendCommandToParent('myHotel');
	}

	logoutClickHandler(){
		let url = window.host + '/auth/logout';

		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}).then(()=>{
			window.authController.cleanLocalStorage();
			document.location.href = window.host;
		}).catch((err) =>{
			console.log(err);
		});
	}


	sendCommandToParent(command){
		this.setState({currentState: command});
		this.props.pageController.changeState(command);
		Menu.hideMenu();
	}

	constructor(props){
		super(props);
		this.state = {
			currentState: ""
		};
		this.logoutClickHandler = this.logoutClickHandler.bind(this);
		this.myHotelClickHandler = this.myHotelClickHandler.bind(this);
		this.ordersClickHandler = this.ordersClickHandler.bind(this);
		this.roomTypesClickHandler = this.roomTypesClickHandler.bind(this);
		this.sendCommandToParent = this.sendCommandToParent.bind(this);
		this.roomsClickHandler = this.roomsClickHandler.bind(this);
	}

	static hideMenu(){
		$('#app').click();
	}


	render(){
		return (
			<div className="welcomePageMenu">
				<button type="button" className="navbar-toggler" data-canvas="#app"
				        data-toggle="offcanvas" data-target="#unAuthMenu">
					&#9776;
				</button>
				<nav id='unAuthMenu' className="welcomePageMenu__menu
				 offcanvas navmenu navmenu-default navmenu-fixed-left
				 offcanvas-toggle" role="navigation">
					<a className="navmenu-brand" onClick={this.brandClickHandler} href="#">Managers panel</a>
					<div className="nav list-group">
						<a className="list-group-item list-group-item-action"
						   onClick={this.myHotelClickHandler}>My hotel</a>
						<a className="list-group-item list-group-item-action"
						   onClick={this.ordersClickHandler}>Orders</a>
						<a className="list-group-item list-group-item-action"
						   onClick={this.roomsClickHandler}>Rooms</a>
						<a className="list-group-item list-group-item-action"
						   onClick={this.roomTypesClickHandler}>Room Types</a>
						<hr/>
						<a className="list-group-item list-group-item-action"
						   onClick={this.logoutClickHandler}>Logout</a>
					</div>
				</nav>
			</div>
		)
	}
}

