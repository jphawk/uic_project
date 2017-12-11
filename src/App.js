import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DataModule from './DataModule';
import LoginPage from './views/login.jsx';
import SignUpPage from './views/signup.jsx';
import LogOutPage from './views/logout.jsx';
import TranslatorPage from './views/translator.jsx';
import RequesterPage from './views/requester.jsx';
import RequestDetailsPage from './views/requestdetails.jsx';
import TranslationDetailsPage from './views/translationdetails.jsx';
import ConfirmationPage from './views/confirmation.jsx';
import EditorPage from './views/editor.jsx';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
	
	createInitialData = () => {
		//Login information
		localStorage.setItem("logins", JSON.stringify([{user: 'user@a.com', password: 'pass', type: 'requester', name: 'Requester Test'}, {user: 'translator@a.com', password: 'password', type: 'translator', name: 'Translator Tests'}]));
		
		//Request/Translation information
		localStorage.setItem("requests", JSON.stringify([{id: 23, title: 'Instructions for a German travel card', requesterName: 'Alan Muller', requester: 'user@a.com', translator: '',
																										 wordCount: 1623, pages: 3, status: 20, source: 'German', target: 'Finnish', sample: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}]))
		
	}

	render() {
		
		this.createInitialData();
		
		return (
			<BrowserRouter>		
			<div>
			<Route exact path="/" component={LoginPage}/>
			<Route path="/signup" component={SignUpPage}/>
			<Route path="/logout" component={LogOutPage}/>
			<Route path="/requester" component={RequesterPage}/>
			<Route exact path="/request/:requestid" component={RequestDetailsPage}/>
			<Route path="/translator" component={TranslatorPage}/>
			<Route exact path="/translation/:translationid" component={TranslationDetailsPage}/>
			<Route path="/translation/:translationid/edit" component={EditorPage}/>
			<Route path="/translation/:translationid/confirm" component={ConfirmationPage}/>
			
			<footer className="footer" id="footer">
						<div className="footerwrapper">
							<p>© Copywrite</p>
						</div>
					</footer>
			</div>
			
			</BrowserRouter>
		);
	}
}

export default App;
