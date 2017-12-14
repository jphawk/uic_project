import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
		
		//localStorage.clear();
				
		if (localStorage.getItem("logins") !== null){
			logins = JSON.parse(localStorage.getItem("logins"));
		}else{
			//Login information
			//requester
			logins.push({user: 'alan.muller@gmail.com', password: 'pass', type: 'requester', name: 'Alan Muller', languages: []});
			//translator
			logins.push({user: 'john.penwood@gmail.com', password: 'password', type: 'translator', name: 'John Penwood',
									 languages: [{English: 'C2'}, {German: 'C1'}, {Finnish: 'C1'}]});
		}

		if (localStorage.getItem("requests") !== null){
			requests = JSON.parse(localStorage.getItem("requests"));
		}else{
			//Request/Translation information
			requests.push({id: 1, title: 'Instructions for a German travel card', requesterName: 'Alan Muller', 														 requester: 'alan.muller@gmail.com', translator: 'john.penwood@gmail.com', translatorName: 'John Penwood',
									 wordCount: 1623, pages: 3, status: 20, source: 'German', target: 'Finnish', sample: 'Einen Tag lang beliebig viel fahren und mit bis zu fünf Personen ein Bundesland entdecken - die Länder-Tickets der Bahn machen es möglich. ', fullText: 'Einen Tag lang beliebig viel fahren und mit bis zu fünf Personen ein Bundesland entdecken - die Länder-Tickets der Bahn machen es möglich. Wählen Sie Ihr gewünschtes Bundesland aus, um weitere Infos zu erhalten und zur Buchung zu gelangen.', translatedText: '', description: 'Please, make the translation official, if it is possible'});
            
			requests.push({id: 2, title: 'Email from my bank', requesterName: 'Thomas Mullerleile', 														requester: 'thomas.mullerleile@gmail.com', translator: '', translatorName: '',
									 wordCount: 1002, pages: 2, status: 0, source: 'German', target: 'English', sample: 'Bereits mehr als vier Millionen Postbank Kunden haben sich für das komfortable Postbank Online-Banking entschieden. Ob zu Hause, am Arbeitsplatz oder weltweit unterwegs', fullText: 'Bereits mehr als vier Millionen Postbank Kunden haben sich für das komfortable Postbank Online-Banking entschieden. Ob zu Hause, am Arbeitsplatz oder weltweit unterwegs – mit unserem Online-Banking haben Sie jederzeit und überall direkten Zugriff auf Ihr Girokonto.', translatedText: '', description: 'It is important for me to know what documents I should provide for the first bank appointment. Please, help me with this'});
            

            requests.push({id: 3, title: 'Email from Migri', requesterName: 'Sean Lock', 														requester: 'sean.lock@gmail.com', translator: '', translatorName: '',
									 wordCount: 500, pages: 1, status: 0, source: 'Finnish', target: 'English', sample: 'Maahanmuuttovirasto myöntää jatkoluvan, jos edellytykset, joiden perusteella sinulle myönnettiin edellinen määräaikainen oleskelulupa, ovat edelleen olemassa.', fullText: 'Maahanmuuttovirasto myöntää jatkoluvan, jos edellytykset, joiden perusteella sinulle myönnettiin edellinen määräaikainen oleskelulupa, ovat edelleen olemassa.', translatedText: '', description: 'There are two contact numbers in the text. Which should I use to know more about my residence permit?'});
			
            requests.push({id: 4, title: 'Request for Russian visa', requesterName: 'Sanna Lehtinen', 														requester: 'sanna.lehtinen@gmail.com', translator: '', translatorName: '',
									 wordCount: 500, pages: 1, status: 0, source: 'Finnish', target: 'Russian', sample: 'Ulkomaan kansalainen saa maksutta maahantulokorttikaavakkeen rajavalvontaviranomaisilta saapuessaan Venäjän federaatioon tai ulkomaan kansalaisille matkapalveluita tarjoavan organisaation työntekijöiltä.', fullText: 'Ulkomaan kansalainen saa maksutta maahantulokorttikaavakkeen rajavalvontaviranomaisilta saapuessaan Venäjän federaatioon tai ulkomaan kansalaisille matkapalveluita tarjoavan organisaation työntekijöiltä.', translatedText: '', description: 'Please, translate it as soon as possible'});
            
            requests.push({id: 5, title: 'Instructions for my visa', requesterName: 'Anna Hietala', 														requester: 'anna.hietala@gmail.com', translator: '', translatorName: '',
									 wordCount: 500, pages: 1, status: 0, source: 'Russian', target: 'Finnish', sample: 'Заявитель может подать документы также через аккредитованные туристические агентства, но в каждые 59 месяцев он должен лично приходить в визовый центр для сдачи своих отпечатков.', fullText: 'Заявитель может подать документы также через аккредитованные туристические агентства, но в каждые 59 месяцев он должен лично приходить в визовый центр для сдачи своих отпечатков.', translatedText: '', description: 'I did not understand what I should do every 59 months or weeks. Can explain, please?'});
            
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
