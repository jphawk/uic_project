import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import Header from './header';

export default class ConfirmationPage extends Component {    

	render() {
		var newLink = '/translation/' + this.props.match.params.translationid + '/edit';
		
		return (
			<div>
				<Helmet>
					<meta charset="utf-8" />
					<title>Confirmation</title>
					<meta name="confirmation" content="Confirmation page" />
					<meta name="author" content="Team Translator" />
				</Helmet>

				<div id="page-confirmation" class="page">
					<div id="content" className="confirmation">
						<h1>Thank you for editing this translation!</h1>
						<h3>Is this the final version?</h3>
						<div id="confirmation-buttons-wrapper">
							<a className="dark-link" href="/" title="Yes, submit">Yes, submit</a>
							<a className="light-link" href={newLink} title="No, back to Editor">No, back to Editor</a>
						</div>
						<div id="bottom-link-confirmation">
							<a class="dark-link confirmation" href="/translator" title="Back to the Dashboard">Back to the Dashboard</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}