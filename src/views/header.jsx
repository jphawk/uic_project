import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import App from '../App';
import './css/styles.css';
import logo from './img/capricorn.png';

export default class Header extends Component { 	

	render() {

		return (
			<header className="header" id="header">
				<div className="headerwrapper">
					<div id="header-logo">
						<img src={logo} alt="Translator logo" className="logo-top" />
						<h2>Translator</h2>
					</div>
					<div id="header-right">
						<a className="logout-link">Log out</a>
						<p>Welcome, {localStorage.getItem("loggedInName")}!</p>
					</div>
				</div>
			</header>
		);
	}
}



