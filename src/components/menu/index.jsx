import * as React from 'react';
import * as ReactDOM from 'react-dom';



export class Menu extends React.Component{
	brandClickHandler(){
		if(window.authController.isAuthorized()){
			this.sendCommandToParent("lkPage");
		}else{
			this.sendCommandToParent("promo");
		}
	}

	hotelClickHandler(){
		this.sendCommandToParent("hotels");
	}

	ownerClickHandler(){
		this.sendCommandToParent('owners');
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
			this.brandClickHandler();
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
		this.brandClickHandler = this.brandClickHandler.bind(this);
		this.hotelClickHandler = this.hotelClickHandler.bind(this);
		this.ownerClickHandler = this.ownerClickHandler.bind(this);
		this.sendCommandToParent = this.sendCommandToParent.bind(this);
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
					<a className="navmenu-brand" onClick={this.brandClickHandler} href="#">Admin panel</a>
					<div className="nav list-group">
						<a className="list-group-item list-group-item-action"
						   onClick={this.ownerClickHandler}>Owners</a>
						<a className="list-group-item list-group-item-action"
						   onClick={this.hotelClickHandler}>Hotels</a>
						<a className="list-group-item list-group-item-action">System status</a>
						<hr/>
						<a className="list-group-item list-group-item-action"
						   onClick={this.logoutClickHandler}>Logout</a>
					</div>
				</nav>
			</div>
		)
	}
}

