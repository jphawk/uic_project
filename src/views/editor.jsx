import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import Header from './header';

export default class EditorPage extends Component { 
	
	constructor(props) {
		super(props);

		var languageCodes = {
			Finnish : 'fi',
			Swedish : 'sv',
			English : 'en',
			German : 'de',
			Russian : 'ru',
			Romanian : 'ro'
		};
		
		this.state = {currentTranslation : {}, targetCode: '', sourceCode: '', translatedText: ''};

		this.getTranslation();
		
		

		//Get language codes here, to make things a bit simpler
		this.state.sourceCode = languageCodes[this.state.currentTranslation.source];
		this.state.targetCode = languageCodes[this.state.currentTranslation.target];
		
		this.getAutoTranslation();
	}	

	getTranslation = () => {
		var requests = JSON.parse(localStorage.getItem("requests"));

		for (var key in requests){
			if (requests[key].id == this.props.match.params.translationid){			

				//Correct user, add to user requests
				this.state.currentTranslation = requests[key];
			}
		}
		
		this.state.translatedText = this.state.currentTranslation.translatedText;
	}

	//AutoTranslation using Yandex API
	getAutoTranslation = () => {
		var self = this;

		fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20171213T014034Z.e1196a425bed27ba.a17e5539b7bcc4c58f6a7935df5187d0a5a00369&text='+ 
					this.state.currentTranslation.fullText
					+'&lang='+ this.state.sourceCode + '-' + this.state.targetCode)
			.then(function(response) {
				return response.json();
			}).then(function(data) {
				self.setState({ data }, () => console.log(self.state));
				var div = document.getElementById('content2');

				div.innerHTML += data.text[0];
			});
	}

	//Dictionary word-by-word using Yandex Translate API; Dictionary aPI does not support our languages
	dictionarySearch = (event) => {
		event.preventDefault();
		event.stopPropagation();
		
		var word = document.getElementById('search-input').value;
		var languages = document.getElementById('dictionary-langs').value;

		var self = this;

		fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20171213T014034Z.e1196a425bed27ba.a17e5539b7bcc4c58f6a7935df5187d0a5a00369&text='+ 
					word
					+'&lang='+ languages)
			.then(function(response) {
				return response.json();
			}).then(function(data) {
				self.setState({ data }, () => console.log(self.state));
				var div = document.getElementById('dictionary-results');
				var ls = languages.split('-');
				div.innerHTML = '<p class="first-lg">' + ls[0] + '</p>' +
												'<p class="second-lg">' + ls[1] + '</p>' +
												'<p class="first-rs">' + word + '</p>' +
												'<p class="second-rs">' + data.text[0] + '</p>';
			});

	}
	
	handleChangeTranslatedText =(event) => {
    this.setState({translatedText: event.target.value});
  }
	
	saveAndContinue = () => {
		
		var requests = JSON.parse(localStorage.getItem("requests"));

		for (var key in requests){
			if (requests[key].id == this.state.currentTranslation.id){			

				//Correct request, update translation
				requests[key].translatedText = this.state.translatedText;
				requests[key].translator = localStorage.getItem("loggedIn");
				requests[key].translatorName = localStorage.getItem("loggedInName");
				
				//Update status if work has been done; this is not a reliable formula, we just use it for the purpose of showing the change in the interface
				requests[key].status = Math.floor(requests[key].translatedText.split(' ').length / requests[key].fullText.split(' ').length * 100);
				
				//Make sure it is not 100(unless submitted) or over
				while (requests[key].status > 95){
					requests[key].status -= 10;
				}
			}
		}
		
		localStorage.setItem("requests", JSON.stringify(requests));
		
		this.props.history.push('/translation/' + this.props.match.params.translationid + '/confirm');
		
	}

	render() {

		return (
			<div className="page-wrapper">
				<Helmet>
					<meta charset="utf-8" />
					<title>Translator's Dashboard</title>
					<meta name="description" content="Requestor's Dashboard" />
					<meta name="author" content="Team Translator" />
				</Helmet>

				<Header />

				<div id="page-edit-translation" className="page">
					<div id="content" className="edit">
						<h1>{this.state.currentTranslation.title}</h1>
						<p><b>Requestor:</b> {this.state.currentTranslation.requesterName}</p>

						<p><b>Requestor's email:</b> {this.state.currentTranslation.requester}</p>

						<div id="edit-radio-wrapper">
							<form id="edit-form-wrapper" action="/">
								<label className="tooltip">On-hover Dictionary settings 
									<span className="tooltiptext">You can highlight a word in Original and Auto translated text to get a translation for it.</span>
								</label>
								<input id="dt-definition" type="radio" name="dictionary-switch" value="Definition" defaultChecked/>
								<label htmlFor="dt-definition">Definition</label>
								<input id="dt-word" type="radio" name="dictionary-switch" value="Word-to-word"/>
								<label htmlFor="dt-word">Word-to-word</label>
							</form>
						</div>

						<div id="edit-wrapper">
							<div id="edit-tabs">

								<input id="tab1" type="radio" name="tabs" defaultChecked />
								<label htmlFor="tab1">Original</label>

								<input id="tab2" type="radio" name="tabs" />
								<label htmlFor="tab2">Auto Translation</label>

								<input id="tab3" type="radio" name="tabs" />
								<label htmlFor="tab3">Dictionary</label>

								<section id="content1">
									{this.state.currentTranslation.fullText}
								</section>

								<section id="content2">
								</section>

								<section id="content3">

									<div id="dictionary-wrapper">
										<form className="dictionary-wrapper" onSubmit = {this.dictionarySearch}>
											<h3>Translate</h3>
											<div id="dictionary-float">
												<select id="dictionary-langs" className="df-input classic">
                                                    <option value={this.state.sourceCode + '-' + this.state.targetCode} defaultValue>{this.state.currentTranslation.source} to {this.state.currentTranslation.target} </option>
													<option value={this.state.targetCode + '-' + this.state.sourceCode} >{this.state.currentTranslation.target} to {this.state.currentTranslation.source}</option>
												</select>												
											</div>

											<input type="text" placeholder="Search for a word..." className="dict-search" id='search-input' name="search" />
											<button type="submit" value=" " className="form-submit dark-button" />
										</form>
										
										<div id="dictionary-results" />
                                        
									</div>

								</section>

							</div>
							<div id="edit-area">
								<textarea placeholder="Insert your translation here"  value={this.state.translatedText} onChange={this.handleChangeTranslatedText}>
								</textarea>
							</div>
						</div>

						<div className="progress-wrapper">
							<h2>Status</h2>
							<div className="progress-bar-outer">
								{this.state.currentTranslation.status > 0 ?
								<div className="progress-bar-inner" style={{width: this.state.currentTranslation.status + "%"}}>
									{this.state.currentTranslation.status}%
								</div>:
								<div className="progress-bar-inner" style={{color: "#000", backgroundColor: "#f1f1f1"}}>
									{this.state.currentTranslation.status}%
								</div>
									}
							</div>
						</div>

						<div id="edit-control-wrapper">

							<div id="edit-buttons-wrapper">
								<p>What do you want to do with this translation?</p>
								<a className="dark-link" title="Save and Continue" onClick={this.saveAndContinue}>Save and Continue</a>
								<a className="light-link" href="/translator" title="Cancel">Cancel</a>
							</div>
                            
                            <div id="yandex-wrapper">
                            <a className="yandex-dictionary" href="https://tech.yandex.com/dictionary/" title="Yandex Dictionary">Powered by Yandex.Dictionary</a>
                            </div>
						</div>

					</div>
				</div>

			</div>
		);
	}
}