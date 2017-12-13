import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import App from '../App';
import './css/styles.css';
import logo from './img/capricorn.png';

export default class SignUpPage extends Component {   

	state = {name: '', email: '', pass: '', repeatpass: '', translatorSelected: false, errors : []};

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

	this.setState({errors: []});


	if (this.state.name === ''){
		this.state.errors.push("Please give your name to sign up.");				
	} 

	//validate the form fields: not empty, one email field
	if (this.state.email === '' ){
		this.state.errors.push("Please give your email to sign up.");
	}

	if (this.state.pass === ''){
		this.state.errors.push("Please give your password to sign up.");				
	}

	if (this.state.repeatpass === ''){
		this.state.errors.push("Please repeat your password.");				
	}

	if (this.state.repeatpass !== this.state.pass){
		this.state.errors.push("The passwords you entered do not match.");				
	}	

	if ( this.translatorSelected && (document.getElementById('lang1').value === "" || 
																	 document.getElementById('level1').value === "" ||
																	 document.getElementById('lang2').value === "" ||
																	 document.getElementById('level2').value === "" )){
		this.state.errors.push("Please select your language skills from the dropdowns.");	
	}

	if (this.state.errors.length === 0){

		//process the submit: gather all data and save
		//Login information
		var logins = JSON.parse(localStorage.getItem("logins"));

		var newUser = {user: this.state.email, password: this.state.pass, type: 'requester', name: this.state.name};

		//if translator, add info on their languages, else requester user
		if (this.state.translatorSelected){
			newUser.type = 'translator';
			newUser.languages = [{},{}];

			newUser.languages[0][document.getElementById('lang1').value] =
				document.getElementById('level1').value;
			newUser.languages[1][document.getElementById('lang2').value] =
				document.getElementById('level2').value;
		}else{
			newUser.type = 'requester';
		}

		//add: check uniqueness of email first
		logins.push(newUser);	
		localStorage.setItem("logins", JSON.stringify(logins));

		//Login new user automatically
		localStorage.setItem("loggedIn", this.state.email);	
		localStorage.setItem("loggedInName", this.state.name);		

		//Valid username and password, check the type of user
		if (this.state.translatorSelected)
			this.props.history.push('/translator');
		else
			this.props.history.push('/requester');

	}

	var errorList = '';

	for (var i = 0; i < this.state.errors.length; i++){
		errorList += '<p>' + this.state.errors[i] + '</p>';
	}

	document.getElementById("errors").innerHTML = this.state.errors;


}

render() {
	return (

		<div className="page-wrapper">
			<Helmet>
				<meta charset="utf-8"/>
				<title>Sign Up</title>
				<meta name="description" content="Sign up to the Translator" />
				<meta name="author" content="Team Translator" />
			</Helmet>
			<div id="page-signup" className="page">
				<div id="content" className="login-signup">
					<div className="form-top">
						<img src={logo} alt="Translator logo" className="logo-form" />
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

							{!this.state.translatorSelected ?
								<label id="rq-explain">Requestor profile will give you functionality for ordering translations</label>
								: null }

							{this.state.translatorSelected ?
								<div id="wrapper-select-lg" className="one">
									<label>Your language skills:</label>
									<div className="one">
										<select id="lang1" className="select-lg classic">
											<option value="" disabled selected>Language</option>
											<option value="Finnish">Finnish</option>
											<option value="Swedish">Swedish</option>
											<option value="English">English</option>
											<option value="German">German</option>
											<option value="Russian">Russian</option>
											<option value="Romanian">Romanian</option>
										</select>

										<select id="level1" className="select-level classic">
											<option value="" disabled selected>Level</option>
											<option value="B2.2">B2.2</option>
											<option value="C1.1">C1.1</option>
											<option value="C1.2">C1.2</option>
											<option value="C2">C2</option>
										</select>
									</div>

									<div className="two">
										<select id = "lang2" className="select-lg classic">
											<option value="" disabled selected>Language</option>
											<option value="Finnish">Finnish</option>
											<option value="Swedish">Swedish</option>
											<option value="English">English</option>
											<option value="German">German</option>
											<option value="Russian">Russian</option>
											<option value="Romanian">Romanian</option>
										</select>

										<select id="level2" className="select-level classic">
											<option value="" disabled selected>Level</option>
											<option value="B2.2">B2.2</option>
											<option value="C1.1">C1.1</option>
											<option value="C1.2">C1.2</option>
											<option value="C2">C2</option>
										</select>
									</div>

									<label id="select-link-label">Find out more about <br/> CEFR language levels  <a href="https://www.coe.int/en/web/common-european-framework-reference-languages/" title="About CEFR">HERE</a></label>

								</div> :
							null						
							}

							<div id="errors" className="errors">
							</div>

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