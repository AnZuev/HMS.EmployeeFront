import * as React from 'react';



export class GetOrdersSearchForm extends React.Component {

	constructor(props) {
		super(props);
		this.handleSearchClick = this.handleSearchClick.bind(this);
	}

	getDataFromInput(){
		return  {
			startDate: $('#ManagerPart__Orders__searchForm__from').val(),
			finishDate: $('#ManagerPart__Orders__searchForm__to').val()
		};
	}

	handleSearchClick(){
		this.props.parent.loadOrders(this.getDataFromInput());
	}

	render() {
		return 	(
			<div className="form-horizontal ManagerPart__Orders__searchForm">
				<div className="form-group">
					<label htmlFor="ManagerPart__Orders__searchForm__from">From:</label>
					<input type="date"
					       className="form-control"
					       id="ManagerPart__Orders__searchForm__from"
					       defaultValue={new Date().addDays(1).toDateInputValue()}/>
				</div>
				<div className="form-group">
					<label htmlFor="ManagerPart__Orders__searchForm_to">To:</label>
					<input type="date"
					       className="form-control"
					       id="ManagerPart__Orders__searchForm__to"
					       defaultValue={new Date().addDays(60).toDateInputValue()}
					/>
				</div>

				<button className="btn btn-lg btn-success btn-block" onClick={this.handleSearchClick}>Search</button>
			</div>
		)
	}




}
Date.prototype.toDateInputValue = (function() {
	var local = new Date(this);
	local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
	return local.toJSON().slice(0,10);
});

Date.prototype.addDays = function(days)
{
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}


