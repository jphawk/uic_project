import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import logo from './img/capricorn.png';
import './img/search.png';
import DataModule from '../DataModule';
import { Link } from 'react-router-dom';

export default class SignUpPage extends Component {   

	state = {name: '', email: '', pass: '', repeatpass: '', translatorSelected: false};

selectTranslator = () => {
	this.setState({translatorSelected: true});	
}

selectRequester = () => {
	this.setState({translatorSelected: false});
}

handleChangeName =(event) => {
	this.setState({name: event.target.value});
}

handleChangeEmail =(event) => {
	this.setState({email: event.target.value});
}

handleChangePassword =(event) => {
	this.setState({pass: event.target.value});
}

handleChangeRepeatPassword =(event) => {
	this.setState({repeatpass: event.target.value});
}

handleSubmit = (event) => {
	event.preventDefault();

	//process the submit: gather all data and save; add form validation later
	//Login information
	var logins = JSON.parse(localStorage.getItem("logins"));

	var newUser = {user: this.state.email, password: this.state.pass, type: 'requester', name: this.state.name};

	//if translator, add info on their languages, else requester user
	if (this.state.translatorSelected){
		newUser.type = 'translator';
	}else{
		newUser.type = 'requester';
	}

	//add: check uniqueness of email first
	logins.push(newUser);	
	localStorage.setItem("logins", JSON.stringify(logins));

	//Login new user automatically
	localStorage.setItem("loggedIn", this.state.email);				

	//Valid username and password, check the type of user
	if (this.state.translatorSelected)
		this.props.history.push('/translator');
	else
		this.props.history.push('/requester');


}

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
						<img src="img/capricorn.png" alt="Translator logo" className="logo-form" />
						<h1>Translator</h1>
					</div>
					<form  accepted-charset="UTF-8" id="signup" className="webform-processed">
						<div className="wrapper">
							<input type="text" name="fullname" className="signup-input" size="60" placeholder="Full Name" autoComplete="OFF" value={this.state.name} onChange={this.handleChangeName}/>
							<input type="email" name="email" className="signup-input" size="60" placeholder="Email" autoComplete="OFF" value={this.state.email} onChange={this.handleChangeEmail}/>
							<input type="password" name="pass" className="signup-input" size="60" placeholder="Password" autoComplete="OFF" value={this.state.pass} onChange={this.handleChangePassword}/>
							<input type="password" name="repeatpass" className="signup-input" size="60" placeholder="Repeat password" autoComplete="OFF"
								value={this.state.repeatpass} onChange={this.handleChangeRepeatPassword}/>

							<div id="wrapper-radio-tr-rq">
								<label>You want to sign up as... </label>
								<input id="radio-translator" type="radio" name="radio-translator" value="Translator" onChange= {() => { this.selectTranslator()}} checked={this.state.translatorSelected ? 'checked' : ''}/>
								<label htmlFor="radio-translator">Translator</label>
								<input id="radio-requestor" type="radio" name="radio-translator" value="Requestor" onChange= {() => { this.selectRequester()}} checked={this.state.translatorSelected ? '' : 'checked'}/>
								<label htmlFor="radio-requestor">Requestor</label>
							</div>

							{this.state.translatorSelected ?
								<div id="wrapper-select-lg">
									<select id="select-lg" className="classic">
										<option value="Finnish">Finnish</option>
										<option value="Swedish">Swedish</option>
										<option value="English">English</option>
										<option value="German">German</option>
										<option value="Russian">Russian</option>
										<option value="Romanian">Romanian</option>
									</select>

									<select id="select-level" className="classic">
										<option value="B2.2">B2.2</option>
										<option value="C1.1">C1.1</option>
										<option value="C1.2">C1.2</option>
										<option value="C2">C2</option>
									</select>
								</div> :
							null						
							}

							<div className="wrapper-login-signup">
								<input type="submit" value="Sign Up" className="form-signup dark-button" onClick={this.handleSubmit}/>
							</div>
							<p id="floating-p">or</p>
							<div className="wrapper-login-login">
								<Link to={`/`}>
									<input type="button" value="Login" className="form-submit light-button"/>
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