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

	constructor(props) {
		super(props);
		this.createInitialData();
	}

	createInitialData = () => {

		var logins = [];
		var requests = [];
		
		if (localStorage.getItem("logins") !== null){
			logins = JSON.parse(localStorage.getItem("logins"));
		}else{
			//Login information
			logins.push({user: 'alan.muller@gmail.com', password: 'pass', type: 'requester', name: 'Alan Muller', languages: []});
			logins.push({user: 'john.penwood@gmail.com', password: 'password', type: 'translator', name: 'John Penwood',
									 languages: [{English: 'C2'}, {German: 'C1'}, {Finnish: 'C1'}]});
		}

		if (localStorage.getItem("requests") !== null){
			requests = JSON.parse(localStorage.getItem("requests"));
		}else{
			//Request/Translation information
			requests.push({id: 1, title: 'Instructions for a German travel card', requesterName: 'Alan Muller', 																										requester: 'alan.muller@gmail.com', translator: 'john.penwood@gmail.com', translatorName: 'John Penwood',
									 wordCount: 1623, pages: 3, status: 20, source: 'German', target: 'Finnish', sample: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', fullText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', translatedText: ''});
		}

		localStorage.setItem("logins", JSON.stringify(logins));
		localStorage.setItem("requests", JSON.stringify(requests));

	}

	render() {

		return (
			<BrowserRouter>		
			<div>
			<Route exact path="/" component={LoginPage}/>
			<Route path="/signup" component={SignUpPage}/>
			<Route path="/logout" component={LogOutPage}/>
			<Route exact path="/requester" component={RequesterPage}/>
			<Route path="/requester/:requestid" component={RequesterPage}/>
			<Route exact path="/request/:requestid" component={RequestDetailsPage}/>
			<Route exact path="/translator" component={TranslatorPage}/>
			<Route path="/translator/:translationid" component={TranslatorPage}/>
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
