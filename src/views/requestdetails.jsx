import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import Header from './header';

export default class RequestDetailsPage extends Component {   
	
	constructor(props) {
		super(props);
		
		this.state = {currentRequest : {}};
		
		this.getRequest();
	}	

	getRequest = () => {
		var requests = JSON.parse(localStorage.getItem("requests"));

		for (var key in requests){
			if (requests[key].id == this.props.match.params.requestid){			

				//Correct user, add to user requests
				this.state.currentRequest = requests[key];
			}
		}
	}

	render() {
		return (
			<div>

				<Helmet>
					<meta charset="utf-8" />
					<title>Request's description</title>
					<meta name="description" content="Request's description" />
					<meta name="author" content="Team Translator" />
				</Helmet>

				<Header />

				<div id="page-rq-description" className="page">
					<div id="content" className="description">
						<h1>{this.state.currentRequest.title}</h1>
						<h2>Requests's description</h2>
						<p><b>Translator:</b> {this.state.currentRequest.translatorName}</p>
						<p><b>Translator's email:</b> {this.state.currentRequest.translator}</p>
						<p><b>Number of pages:</b> {this.state.currentRequest.pages }</p>
						<p><b>Word count:</b> {this.state.currentRequest.wordCount}</p>
            <p><b>Comments:</b> {this.state.currentRequest.description}</p>
						<p><b>Text sample:</b> {this.state.currentRequest.fullText.split(/\s+/).slice(0,20).join(" ")}</p>
						<a className="dark-link" href="/requester" title="Back to the Dashboard">Back to the dashboard</a>

						<div className="progress-wrapper">
							<h2>Status</h2>
							<div className="progress-bar-outer">
								<div className="progress-bar-inner" style={{width: this.state.currentRequest.status + "%"}}>
									{this.state.currentRequest.status}%
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}