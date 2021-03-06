import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import Header from './header';

export default class TranslationDetailsPage extends Component {   
	
	constructor(props) {
		super(props);
		
		this.state = {currentTranslation : {}};
		
		this.getTranslation();
		
		
	}	
	
	getTranslation = () => {
		var requests = JSON.parse(localStorage.getItem("requests"));

		for (var key in requests){
			if (requests[key].id == this.props.match.params.translationid){			

				//Correct user, add to user requests
				this.state.currentTranslation = requests[key];
			}
		}
	}

	
	render() {		
		return (
			<div className="page-wrapper">
			<Helmet>
				<meta charset="utf-8" />
				<title>Request's description for Translator</title>
				<meta name="description" content="Request description for translator" />
				<meta name="author" content="Team Translator" />

			</Helmet>

			<Header />

			<div id="page-tr-description" className="page">
				<div id="content" className="description">
					<h1>{this.state.currentTranslation.title}</h1>
					<h2>Translation's description</h2>
					<p><b>Requester:</b> {this.state.currentTranslation.requesterName}</p>
					<p><b>Requester's email:</b> {this.state.currentTranslation.requester}</p>
					<p><b>Number of pages:</b> {this.state.currentTranslation.pages}</p>
					<p><b>Word count:</b> {this.state.currentTranslation.wordCount}</p>
                    <p><b>Comments:</b> {this.state.currentTranslation.description}</p>
					<p><b>Text sample:</b> {this.state.currentTranslation.fullText.split(/\s+/).slice(0,20).join(" ")}</p>
					<div className>
						<a className="dark-link" href="/translator" title="Back to the Dashboard">Back to the dashboard</a>
						{this.state.currentTranslation.status < 100 ?
						<a className="light-link tr-description-link" href={'/translation/' + this.props.match.params.translationid + '/edit'} title="Continue with this translation">Continue with this translation</a> : null
							}
						<div className="progress-wrapper">
							<h2>Status</h2>
							<div className="progress-bar-outer">
								{this.state.currentTranslation.status > 0 ?
								<div className="progress-bar-inner" style={{width: this.state.currentTranslation.status + "%"}}>
									{this.state.currentTranslation.status}%
								</div>:
								<div className="progress-bar-inner" style={{color: "#000", backgroundColor: "#f1f1f1"}}>
									{this.state.currentTranslation.status}%
								</div>
									}
							</div>
						</div>
					</div>
				</div>
				</div>
			</div>


				);
				}
				}