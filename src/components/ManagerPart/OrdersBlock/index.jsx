import * as React from 'react';

import {OrderBlockItem} from "./orderItem/index.jsx"
import {GetOrdersSearchForm} from "./searchForm/index.jsx"

export class OrdersBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hidden: false,
			orders: [],
			searchStarted: false
		};
	}

	hide(){
		this.setState({hidden: true});
	}

	show(){
		this.setState({hidden: false});
	}

	loadOrders(data) {
		let url = window.host + '/private/orders/';

		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(data)
		}).then((response)=> {
			if (response.status == 200) {
				return response.json()
					.then((json) => {
						this.setState({
							orders: json,
							searchStarted: true
						});
					})
			} else if(response.status == 204) {
				this.setState({
					orders: [],
					searchStarted: true
				});
			}else{
				//server error happened, need to be somehow handled
				new Error({exception: true, type: "Server Error"});
			}
		}).catch((err) => {
			console.log(err);
		});
	}

	render(){
		let block = [];
		let block2 = "";

		if(this.state.searchStarted){
			if(this.state.orders.length > 0) {
				block2 = (<div>
					<hr/>
					{block}
				</div>);
			}else{
				block2 = <div className="text-muted">
					<span>There is no orders during this period</span>
				</div>
			}
		}

		if(!this.state.hidden){
			this.state.orders.forEach(order => {
				block.push(<OrderBlockItem key={order.id} parent={this} order={order} />);
				block.push(<hr/>);
			});
			return 	(
				<div className="row" id="OrderBlock" >
					<GetOrdersSearchForm parent={this} />
					{block2}
				</div>
			)
		}else{
			return null;
		}
	}

}



