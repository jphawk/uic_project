import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import DataModule from '../DataModule';

export default class RequestDetailsPage extends Component {    

	render() {
		return (
			<div className="App">

				<Helmet>
					<meta charset="utf-8" />
					<title>Request's description</title>
					<meta name="description" content="Request's description" />
					<meta name="author" content="Team Translator" />
				</Helmet>

				<header class="header" id="header">
					<div class="headerwrapper">
						<div id="header-logo">
							<img src="img/logo.png" alt="Translator logo" class="logo-top" />
							<h2>Translator</h2>
						</div>
						<div id="header-right">
							<a class="logout-link" href="/logout">Log out</a>
							<p>Welcome, {localStorage.getItem("loggedIn")}!</p>
						</div>
					</div>
				</header>

				<div id="page-rq-description" class="page">
					<div id="content" class="description">
						<h1>Instructions for a German travel card</h1>
						<h2>Translation's description</h2>
						<p><b>Requestor:</b> Alan Muller</p>
						<p><b>Requestor's email:</b> alan.muller@gmail.com</p>
						<p><b>Number of pages:</b> 3</p>
						<p><b>Word count:</b> 1623</p>
						<p><b>Text sample:</b>"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "</p>
						<a class="dark-link" href="/requester" title="Back to the Dashboard">Back to the dashboard</a>

						<div class="progress-wrapper">
							<h2>Request's status</h2>
							<div class="progress-bar-outer">
								<div class="progress-bar-inner">
									25%
								</div>
							</div>
						</div>
					</div>
				</div>


			</div>



		);
	}
}