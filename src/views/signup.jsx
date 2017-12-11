import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import DataModule from '../DataModule';
import { Link } from 'react-router-dom';

export default class SignUpPage extends Component {   
	
	state = {name: '', email: '', pass: '', repeatpass: ''};

	render() {
		return (

			<div>
				<Helmet>
					<meta charset="utf-8"/>
					<title>Sign Up</title>
					<meta name="description" content="Sign up to the Translator" />
					<meta name="author" content="Team Translator" />
				</Helmet>
				<div id="page-signup" className="page">
					<div id="content" className="login-signup">
						<div className="form-top">
							<img src="img/logo.png" alt="Translator logo" className="logo-form" />
							<h1>Translator</h1>
						</div>
						<form  accepted-charset="UTF-8" id="signup" className="webform-processed">
							<div className="wrapper">
								<input type="text" name="fullname" value={this.state.name} className="signup-input" size="60" placeholder="Full Name" autocomplete="OFF" onChange={this.handleChangeName} />
								<input type="email" name="email" value={this.state.email} className="signup-input" size="60" placeholder="Email" autocomplete="OFF" onChange={this.handleChangeEmail}/>
								<input type="password" name="pass" value={this.state.pass} className="signup-input" size="60" placeholder="Password" autocomplete="OFF" onChange={this.handleChangePassword}/>
								<input type="password" name="repeatpass" value={this.state.repeatpass} className="signup-input" size="60" placeholder="Repeat password" autocomplete="OFF" onChange={this.handleChangePasswordRepeat}/>
								<div className="wrapper-login-signup">
									<input type="submit" value="Sign Up" className="form-signup dark-button" />
								</div>
								<p id="floating-p">or</p>
								<div className="wrapper-login-login">
									<Link to={`/`}>
										<input type="button" value="Login" className="form-submit light-button" />
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>


		);
	}
}