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
			name: '', langTo: '', langFrom: '', description: '', fullText: ''
		};	

		this.getUserRequests();

		if (this.userRequests.length > 0){

			for (var key in this.userRequests){

				this.tableRows.push(<tr id={this.userRequests[key].id} key={this.userRequests[key].id} onClick= {this.viewRequestDetails} className="tr-hover"> 
						<td> {this.userRequests[key].title} </td>
						<td> {this.userRequests[key].source} / {this.userRequests[key].target} </td>
						<td> {this.userRequests[key].status} % ready </td>
						<td> {this.userRequests[key].wordCount} </td>
						<td> {this.userRequests[key].sample} </td>
					</tr> );
			}
		}else{
			this.tableRows.push(<td className="no-requests" colSpan="5"> No requests yet </td>);
		}
	}

	viewRequestDetails = (event) => {
		var requestId = event.currentTarget.id;

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

		var newRequest = {id: requests.length + 1, title: this.state.name, requesterName: '', requester: localStorage.getItem("loggedIn"), translatorName: '', translator: '', wordCount: '', pages: '', status: 0, source: this.state.langFrom, target: this.state.langTo, sample: '', description: this.state.description, fullText: ''};

		//Get text from file
		var fileToLoad = document.getElementById("textFile").files[0];

		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent){

			newRequest.fullText = fileLoadedEvent.target.result;
			newRequest.sample = newRequest.fullText.split(/\s+/).slice(0,20).join(" ");
			newRequest.wordCount = newRequest.fullText.split(" ").length;

			//Find pages by dividing words to averga eword count per page(500)
			newRequest.pages = Math.floor(newRequest.wordCount / 500) + 1;

			requests.push(newRequest);	
			localStorage.setItem("requests", JSON.stringify(requests));

			window.location = '/requester/' + newRequest.id;	

		};

		fileReader.readAsText(fileToLoad, "UTF-8");		

	}

	render() {	

		return (
			<div className="page-wrapper">
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
                                        <th style= {{width: 140}}>
											Request's name
										</th>
                                        <th style= {{width: 140}}>
                                            Languages: from...to
                                        </th>
										<th style={{width: 140}}>
											Request's status
										</th>
										<th style={{width: 100}}>
											Word count
										</th>
										<th>
											Comments
										</th>
									</tr>
									{this.tableRows}
								</tbody>
							</table>
						</div>
									
						{ this.props.match.params.requestid != null ?
							<div id="confirmation-block">
								<h3>Your translation request was successfully submitted!</h3>
								<p>We will inform you by email, when your translation will be ready.</p>
							</div> :
							null
						}

						<div id="rq-form-wrapper">
							<h2>Request a translation</h2>
							<h3>Tell us more about your text</h3>

							<form accepted-charset="UTF-8" id="rq-form" className="webform-processed">

								<div className="label-input-wrapper">
									<label className="tooltip">Choose a name for your text
										<span className="tooltiptext">Choose a reasonable name for your text. It will help translators</span>
									</label>
									<input type="text" name="text-name" className="rq-input" size="60" placeholder="Text Name" autoComplete="OFF" value={this.state.name} onChange={this.handleChangeName}/>
								</div>

								<div className="label-input-wrapper">
									<label>From which language your <br/>text should be translated?</label>
                                    <select name="lng-from" className="rq-input" className="classic" value={this.state.langFrom} onChange={this.handleChangeLangFrom}>
											<option value="" defaultValue>From</option>
									</select>
									</div>

								<div className="label-input-wrapper">
									<label>To which language your<br/> text should be translated?</label>
                                    <select name="lng-to" className="rq-input" className="classic" value={this.state.langTo} onChange={this.handleChangeLangTo}>
											<option value="" defaultValue>To</option>
									</select>
								</div>

								<div className="label-input-wrapper">
									<label>Comments and additional information:</label>
									<textarea name="text-description" className="rq-textarea" rows="4" cols="50" placeholder="Enter your text here..." autoComplete="OFF" value={this.state.description} onChange={this.handleChangeDescription}></textarea>
								</div>

								<div className="label-input-wrapper">
									<label>Upload the file to be translated:</label>
									<input id="textFile" type="file" name="text-upload" className="rq-input" size="300" placeholder="File Upload" autoComplete="OFF" />
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