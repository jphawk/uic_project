import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import Header from './header';

export default class RequesterPage extends Component {  
	
	viewRequestDetails = (requestId) => {
		this.props.history.push('/request/' + requestId);
	}
	
	//Get own requests based on email
	
	getUserRequests = (userId) => {
		var requests = JSON.parse(localStorage.getItem("requests"));
		
		for (var key in requests){
			if (requests[key].requester == localStorage.getItem("loggedIn")){			
		
			//Correct user, build a table row
				
				
				
			}
		}
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
								<tr>
									<th colspan="4">From German to Finnish</th>
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
								<tr onClick= {() => { this.viewRequestDetails(23)}}>
									<td>My translation</td>
									<td>80% ready</td>
									<td>1623</td>
									<td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </td>
								</tr>
							</table>
						</div>

						<div id="rq-form-wrapper">
							<h2>Request another translation</h2>
							<h3>Tell us more about your text</h3>

							<form accepted-charset="UTF-8" method="post" id="rq-form" className="webform-processed">

								<div className="label-input-wrapper">
									<label>Choose a name for your text</label>
									<input type="text" name="text-name" className="rq-input" size="60" placeholder="Text Name" autocomplete="OFF" />
								</div>

								<div className="label-input-wrapper">
									<label>From which language your <br/>text should be translated?</label>
									<input type="text" name="lng-from" className="rq-input" size="60" placeholder="From" autocomplete="OFF" />
								</div>

								<div className="label-input-wrapper">
									<label>To which language your<br/> text should be translated?</label>
									<input type="text" name="lng-to" className="rq-input" size="60" placeholder="To" autocomplete="OFF" />
								</div>

								<div className="label-input-wrapper">
									<label>Please, write a short description of your text:</label>
									<textarea name="text-description" className="rq-textarea" rows="4" cols="50" placeholder="Description" autocomplete="OFF" ></textarea>
								</div>

								<div className="label-input-wrapper">
									<label>Upload your file here:</label>
									<input type="file" name="text-upload" className="rq-input" size="300" placeholder="File Upload" autocomplete="OFF" />
								</div>

								<input type="submit" value="Submit" className="form-submit dark-button" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}