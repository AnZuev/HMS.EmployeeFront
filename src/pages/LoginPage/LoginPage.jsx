import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {LoginForm} from '../../components/loginForm/index.jsx';
import {Menu} from '../../components/menu/index.jsx';



export class LoginPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			hidden: this.props.hidden,
			title: 'login',
			loginFormMessage: ""
		};
	}

	close(){
		this.setState({hidden: true});
	}
	open(){
		this.setState({hidden: false});
	}
	render(){
		if(this.state.hidden){
			return null;
		}else{
			return (
				<div className='page' id="loginPageBlock" >
					<h3>Management</h3>
					<LoginForm  message={this.state.loginFormMessage} />
				</div>
			)
		}

	}
}





