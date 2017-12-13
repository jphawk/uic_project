import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import Header from './header';

export default class TranslatorPage extends Component {
	
	userTranslations = [];
	userLanguages = [];
	tableRows = [];
	dropDown = [];
	searchTableRows = [];

	state = {searchDone: false}
	
	
	constructor(props) {
		super(props);
		
		this.getUserTranslations();
		this.getUserLanguages();		
		
				
	}

	viewTranslationDetails = (event) => {
		
		var translationId = event.currentTarget.id;
		
		if (translationId.indexOf("search") !== -1){
			translationId = translationId.substr(6, translationId.length);
		}

		this.props.history.push('/translation/' + translationId);
	}
	
	//Get own requests based on email

	getUserTranslations = (userId) => {
		var requests = JSON.parse(localStorage.getItem("requests"));

		for (var key in requests){
			if (requests[key].translator == localStorage.getItem("loggedIn")){			

				//Correct user, add to user requests
				this.userTranslations.push(requests[key]);

			}
		}
		
		if (this.userTranslations.length > 0){

			for (var key in this.userTranslations){

				this.tableRows.push(<tr id={this.userTranslations[key].id} key={this.userTranslations[key].id} onClick= {this.viewTranslationDetails} className="tr-hover"> 
						<td> {this.userTranslations[key].title} </td>
						<td> {this.userTranslations[key].source} / {this.userTranslations[key].target} </td>
						<td> {this.userTranslations[key].status} % ready </td>
						<td> {this.userTranslations[key].wordCount} </td>
						<td> {this.userTranslations[key].description} </td>
					</tr> );
			}
		}else{
			this.tableRows.push(<td className="no-requests" colSpan="5"> No translations yet </td>);
		}
	}
	
	getUserLanguages = () => {
		var logins = JSON.parse(localStorage.getItem("logins"));
		var self = this;
		
		for (var key in logins){
			if (logins[key].user === localStorage.getItem("loggedIn") && logins[key].type === "translator"){			
				
				logins[key].languages.forEach(function(element){
						var keys = Object.keys(element);
						self.userLanguages.push(keys[0]);
					});					
			}
		}
		
		if (this.userLanguages.length > 0){			
			for (var key in self.userLanguages){
				this.dropDown.push(<option key={key} value={this.userLanguages[key]} defaultValue>{this.userLanguages[key]}</option>);
			}
		}
	}
	
	doSearch = () => {		
		
		var source = document.getElementById('search-from').value;
		var target = document.getElementById('search-to').value;
		
		var requests = JSON.parse(localStorage.getItem("requests"));

		for (var key in requests){
			if (requests[key].translator == "" && requests[key].source === source && requests[key].target === target){			

				//Correct user, add to user requests
				this.searchTableRows.push(
					<tr id={"search" + requests[key].id} key={"search" + requests[key].id} onClick= {this.viewTranslationDetails} className="tr-hover">
					<td>{requests[key].title}</td>
					<td>{requests[key].wordCount}</td>
					<td>{requests[key].sample}</td>
					</tr>
				);
			}
		}
		
		if (this.searchTableRows.length === 0){
			this.searchTableRows.push(<tr><td className="no-requests" colSpan = "3">No results found with this criteria</td></tr>)
		}	
		
		this.setState({searchDone : true});
		
	}

	render() {
		return (
			<div>
				<Helmet>
					<meta charset="utf-8" />
					<title>Translator's Dashboard</title>
					<meta name="description" content="Requestor's Dashboard" />
					<meta name="author" content="Team Translator" />
				</Helmet>

				<Header />

				<div id="page-rq-dashboard" className="page">
					<div id="content" className="dashboard">
						<h1>Dashboard</h1>
						<h2>Your active translations</h2>
						<div id="tr-table-wrapper">
							<table id="tr-table">
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
						
						{ this.props.match.params.translationid != null ?
							<div id="confirmation-block">
								<h3>Your translation was successfully submitted!</h3>
								<p>Thank you for your contribution.</p>
							</div> :
							null
						}

						<div id="tr-form-wrapper">
							<h2>Browse for new translation requests</h2>

							<form accepted-charset="UTF-8" method="post" id="tr-form" className="webform-processed">

								<div className="label-input-wrapper one">
									<label>Source language</label>
									<select id="search-from" name="lng-from-tr" className="classic">
											<option value="" defaultValue>Select language</option>
											{this.dropDown}
									</select>									
								</div>

								<div className="label-input-wrapper two">
									<label>Target language</label>
									<select id="search-to" name="lng-from-tr" className="classic">
											<option value="" defaultValue>Select language</option>
											{this.dropDown}
									</select>
								</div>
								<div className="submit-wrapper">
									<input type="button" value="Search" onClick={this.doSearch} className="form-submit dark-button" />
								</div>
							</form>
						</div>

						{this.state.searchDone ?
						<div id="tr-search-wrapper">
							<table id="search-table">
								<tbody>
								<tr>
									<th style={{width: 140}}>
										Request's name
									</th>
									<th style={{width: 140}}>
										Word count
									</th>
									<th>
										Text sample
									</th>
								</tr>
								{this.searchTableRows}
								</tbody>
							</table>
						</div> : 
						null}


					</div>
				</div>

			</div>
		);
	}
}