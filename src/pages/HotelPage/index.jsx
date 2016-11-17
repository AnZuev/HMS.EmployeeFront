import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {HotelItem} from "../../components/Hotels/HotelItem/index.jsx";


export class HotelPage extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			hidden: this.props.hidden,
			title: 'myHotels',
			hotel: {}
		};
		this.pageController = this.props.pageController;
		this.loadHotel();

	}


	loadHotel(){
		$.get(window.host + '/private/hotel/information', function (result) {
			if(result){
				this.setState({hotel: result});
			}else{
				// show error or something like that
			}
		}.bind(this));
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
		}
		return (
			<div className='page HotelPage'>
				<HotelItem key={this.state.hotel.id}
				           title={this.state.hotel.name}
				           description={this.state.hotel.description}
				           phoneNumber={this.state.hotel.phoneNumber}
				           address={this.state.hotel.address}
				           mail = {this.state.hotel.mail}
				           id = {this.state.hotel.id}
				           parent = {this}
				/>
			</div>
		)

	}
}





