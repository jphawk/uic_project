import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import logo from './img/capricorn.png';
import { Link } from 'react-router-dom';

export default class LoginPage extends Component {  
	
	state = {email: '', password: ''};

	doLogin = () => {
				
		var logins = JSON.parse(localStorage.getItem("logins"));
		
		for (var key in logins){
			if (logins[key].user == this.state.email && logins[key].password == this.state.password){
				
				localStorage.setItem("loggedIn", this.state.email);
				localStorage.setItem("loggedInName", logins[key].name);				
			
				//Valid username and password, check the type of user
				if (logins[key].type == 'translator')
					this.props.history.push('/translator');
				else
					this.props.history.push('/requester');
			}
		}
		
		
		//display error message
		
	}
	

	handleChangeEmail =(event) => {
    this.setState({email: event.target.value});
  }
	
	handleChangePassword =(event) => {
    this.setState({password: event.target.value});
  }
	
	handleSubmit = (event) => {
    event.preventDefault();
		this.doLogin();
  }
	
	render() {
		return (	
			<div className="page-wrapper">
					<Helmet>
					<meta charset="utf-8"/>
					<title>Login</title>
					<meta name="description" content="Log In to the Translator" />
					<meta name="author" content="Team Translator" />			
				</Helmet>
				
					<div id="page-login" className="page">
						<div id="content" className="login-signup">
							<div className="form-top">
								<img src={logo} alt="Translator logo" className="logo-form" />
								<h1>Translator</h1>
							</div>
							<form accepted-charset="UTF-8" id="login" className="webform-processed" onSubmit={this.handleSubmit}>
								<div className="wrapper">
									<input type="email" name="email" value={this.state.email} className="login-input" size="60" placeholder="Email" autoComplete="OFF" onChange={this.handleChangeEmail} />
									<input type="password" name="pass" value={this.state.password} className="login-input" size="60" placeholder="Password" autoComplete="OFF" onChange={this.handleChangePassword} />
									<div className="wrapper-login-login">
										<input type="submit" value="Login" className="form-submit dark-button" onClick={this.doLogin}/>
									</div>
									<p>Don't have an account yet?</p>
									<div className="wrapper-login-signup">
										<Link to={`/signup`}>
										<input type="button" value="Sign Up" className="form-signup light-button" onClick={this.goToSignUp}/>
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