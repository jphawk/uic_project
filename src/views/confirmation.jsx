import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import Header from './header';

export default class ConfirmationPage extends Component {    

	render() {
				
		return (
			<div className="page-wrapper">
				<Helmet>
					<meta charset="utf-8" />
					<title>Confirmation</title>
					<meta name="confirmation" content="Confirmation page" />
					<meta name="author" content="Team Translator" />
				</Helmet>
                
                <Header />

				<div id="page-confirmation" className="page">
					<div id="content" className="confirmation">
						<h1>Thank you for editing this translation!</h1>
                        <h3>Your work was successfully saved</h3>
						<h4>Is this your final version?</h4>
						<div id="confirmation-buttons-wrapper">
							<a className="dark-link" href={"/translator/" + this.props.match.params.translationid} title="Yes, submit">Yes, submit</a>
							<a className="light-link" href="/translator" title="Back to the Dashboard">Back to the Dashboard</a>
						</div>
						<div id="bottom-link-confirmation">
				            <h4>Want to continue editing your translation?</h4>
                            <a className="light-link" href={'/translation/' + this.props.match.params.translationid + '/edit'} title="Back to Editor">Back to Editor</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}