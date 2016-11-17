import * as React from 'react';


export class OrderBlockItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.order;
		this.handleCancelClick = this.handleCancelClick.bind(this);
		this.handlePayClick = this.handlePayClick.bind(this);
	}


	handleCancelClick(){
		let url = window.host + '/private/order/cancel';
		let id = this.state.id;
		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				orderId: id
			})
		}).then((response)=>{
			console.log(this.props);
			if(response.status == 200){
				this.setState({
					status: "CANCELED"
				})
			}else if(response.status == 401){
				window.authController.cleanLocalStorage();
				window.menu.signInClickHandler();
			}else{
				throw new Error();
			}

		}).catch((err) =>{
			this.setState({
				commonError: "Something went wrong. Reload page and try again"
			});
			console.log(err);
		});
	}
	handlePayClick(){
		let url = window.host + '/private/order/pay';
		let id = this.state.id;
		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				orderId: id
			})
		}).then((response)=>{
			this.props.parent.loadOrders();
			if(response.status == 200){
				this.setState({
					status: "PAID"
				})
			}else if(response.status == 401){
				window.authController.cleanLocalStorage();
				window.menu.signInClickHandler();
			}else{
				throw new Error();
			}

		}).catch((err) =>{
			this.setState({
				commonError: "Something went wrong. Reload page and try again"
			});
			console.log(err);
		});
	}

	render() {
		let errorBlock = "";

		if(this.state.commonError){
			errorBlock = <div className="alert alert-danger" role="alert">
				{this.state.commonError}
			</div>;
		}
		return (
			<div className="row OrderBlockItem">
				{errorBlock}
				<span><b>Id:</b> {this.state.id}</span><br/>
				<span><b>Room:</b> {this.state.roomNumber}</span><br/>
				<span><b>From:</b> {this.state.startDate}</span><br/>
				<span><b>To:</b> {this.state.finishDate}</span><br/>
				<span><b>Cost:</b> {this.state.cost}$</span><br/>
				<span><b>Status:</b> {this.state.status}</span><br/>
				<br/>
				<span><b> Client: </b> {this.state.firstName + " " + this.state.secondName + " (" + this.state.fatherName + ")"}</span><br/>
				<span><b>Phone:</b> {this.state.phoneNumber}</span><br/><br/>
				{(this.state.status == "BOOKED") ?
					<div>
						<button className="btn btn-sm btn-success btn-block pull-right" onClick={this.handlePayClick}>Approve</button>
						<button className="btn btn-sm btn-danger btn-block" onClick={this.handleCancelClick}>Cancel</button>
					</div>
					:
					""}
			</div>
			)
	}

}
