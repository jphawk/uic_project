import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import Header from './header';

export default class RequesterPage extends Component { 

	tableRows = [];

	userRequests = [];

constructor(props) {
	super(props);
	this.state = {
		name: '', langTo: '', langFrom: '', description: ''
	};
	
	

	this.getUserRequests();

	if (this.userRequests.length > 0){

		for (var key in this.userRequests){
			this.tableRows.push(<tr key={key} onClick= {() => { this.viewRequestDetails(this.userRequests[key].id)}}> 
					<td> {this.userRequests[key].title} </td>
					<td> {this.userRequests[key].status} % ready </td>
					<td> {this.userRequests[key].wordCount} </td>
					<td> {this.userRequests[key].sample} </td>
				</tr> );
		}
	}else{
		this.tableRows.push(<tr colSpan="4"> No requests yet </tr>);
	}
}

viewRequestDetails = (requestId) => {
	this.props.history.push('/request/' + requestId);
}

//Get own requests based on email

getUserRequests = (userId) => {
	var requests = JSON.parse(localStorage.getItem("requests"));

	for (var key in requests){
		if (requests[key].requester == localStorage.getItem("loggedIn")){			

			//Correct user, add to user requests
			this.userRequests.push(requests[key]);

		}
	}		
}

handleChangeName =(event) => {
	this.setState({name: event.target.value});
}

handleChangeLangFrom =(event) => {
	this.setState({langFrom: event.target.value});
}

handleChangeLangTo =(event) => {
	this.setState({langTo: event.target.value});
}

handleChangeDescription =(event) => {
	this.setState({description: event.target.value});
}

addNewRequest = (event) => {
	event.preventDefault();

	//process the submit: gather all data and save; add form validation later
	//Requests information
	var requests = JSON.parse(localStorage.getItem("requests"));

	var newRequest = {id: requests.length + 1, title: this.state.name, requesterName: '', requester: localStorage.getItem("loggedIn"), translator: '', wordCount: '', pages: '', status: 0, source: this.state.langFrom, target: this.state.langTo, sample: this.state.description, fullText: ''};

	requests.push(newRequest);	
	localStorage.setItem("requests", JSON.stringify(requests));
	
	//Login new user automatically
	localStorage.setItem("justAddedId", newRequest.id);		
	
}


render() {

	

	return (
		<div>
			<Helmet>
				<meta charset="utf-8" />
				<title>Requestor's Dashboard</title>
				<meta name="description" content="Requestor's Dashboard" />
				<meta name="author" content="Team Translator" />
			</Helmet>

			<Header />

			<div id="page-rq-dashboard" className="page">
				<div id="content" className="dashboard">
					<h1>Dashboard</h1>
					<h2>Your active translation requests</h2>
					<div id="rq-table-wrapper">
						<table id="rq-table">
							<tbody>
							<tr>
								<th colSpan="4">From German to Finnish</th>
							</tr>
							<tr>
								<th style= {{width: "120"}}>
									Request's name
								</th>
								<th style={{width: "120"}}>
									Request's status
								</th>
								<th style={{width: "80"}}>
									Word count
								</th>
								<th>
									Text sample
								</th>
							</tr>
							{this.tableRows}
							</tbody>
						</table>
					</div>

					<div id="rq-form-wrapper">
						<h2>Request another translation</h2>
						<h3>Tell us more about your text</h3>

						<form accepted-charset="UTF-8" id="rq-form" className="webform-processed">

							<div className="label-input-wrapper">
								<label>Choose a name for your text</label>
								<input type="text" name="text-name" className="rq-input" size="60" placeholder="Text Name" autoComplete="OFF" value={this.state.name} onChange={this.handleChangeName}/>
							</div>

							<div className="label-input-wrapper">
								<label>From which language your <br/>text should be translated?</label>
								<input type="text" name="lng-from" className="rq-input" size="60" placeholder="From" autoComplete="OFF" value={this.state.langFrom} onChange={this.handleChangeLangFrom}/>
							</div>

							<div className="label-input-wrapper">
								<label>To which language your<br/> text should be translated?</label>
								<input type="text" name="lng-to" className="rq-input" size="60" placeholder="To" autoComplete="OFF" value={this.state.langTo} onChange={this.handleChangeLangTo}/>
							</div>

							<div className="label-input-wrapper">
								<label>Please, write a short description of your text:</label>
								<textarea name="text-description" className="rq-textarea" rows="4" cols="50" placeholder="Description" autoComplete="OFF" value={this.state.description} onChange={this.handleChangeDescription}></textarea>
							</div>

							<div className="label-input-wrapper">
								<label>Upload your file here:</label>
								<input type="file" name="text-upload" className="rq-input" size="300" placeholder="File Upload" autoComplete="OFF" />
							</div>

							<input type="submit" value="Submit" className="form-submit dark-button" onClick={this.addNewRequest}/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
}