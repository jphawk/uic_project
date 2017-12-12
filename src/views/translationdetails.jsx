import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import Header from './header';

export default class TranslationDetailsPage extends Component {    

	
	render() {
		var newLink = '/translation/' + this.props.match.params.translationid + '/edit';
		
		return (
			<div>
			<Helmet>
				<meta charset="utf-8" />
				<title>Request's description for Translator</title>
				<meta name="description" content="Request description for translator" />
				<meta name="author" content="Team Translator" />

			</Helmet>

			<Header />

			<div id="page-tr-description" className="page">
				<div id="content" className="description">
					<h1>Instructions for a German travel card</h1>
					<h2>Translation's description</h2>
					<p><b>Requestor:</b> Alan Muller</p>
					<p><b>Requestor's email:</b> alan.muller@gmail.com</p>
					<p><b>Number of pages:</b> 3</p>
					<p><b>Word count:</b> 1623</p>
					<p><b>Text sample:</b>"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "</p>
					<div className>
						<a className="dark-link" href="/translator" title="Back to the Dashboard">Back to the dashboard</a>
						<a className="light-link tr-description-link" href={newLink} title="Continue with this translation">Continue with this translation</a>
						<div className="progress-wrapper">
							<h2>Translation's status</h2>
							<div className="progress-bar-outer">
								<div className="progress-bar-inner">
									25%
								</div>
							</div>
						</div>
					</div>
				</div>
				</div>
			</div>


				);
				}
				}