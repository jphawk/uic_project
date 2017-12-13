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

		this.state = {currentTranslation : {}, targetCode: '', sourceCode: ''};

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
	dictionarySearch = () => {
		var word = document.getElementById('search-input').value;
		var source = document.getElementById('dictionary-from').value;
		var target = document.getElementById('dictionary-to').value;

		var self = this;

		fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20171213T014034Z.e1196a425bed27ba.a17e5539b7bcc4c58f6a7935df5187d0a5a00369&text='+ 
					word
					+'&lang='+ source + '-' + target)
			.then(function(response) {
				return response.json();
			}).then(function(data) {
				self.setState({ data }, () => console.log(self.state));
				var div = document.getElementById('dictionary-results');
				div.innerHTML += word + ' (' + source + ') : ' + data.text[0] + ' (' + target + ')';
			});

	}

	render() {

		var newLink = '/translation/' + this.props.match.params.translationid + '/confirm';

		return (
			<div>
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

									<h2>Dictionary</h2>
									<div id="dictionary-wrapper">
										<form action="search">
											<h3>Translate</h3>
											<div id="dictionary-float">
												<select id="dictionary-from" className="df-input classic">
													<option value={this.state.sourceCode} defaultValue>{this.state.currentTranslation.source}</option>
												</select>
												<select id='dictionary-to' className="df-input classic">
													<option value={this.state.targetCode} defaultValue>{this.state.currentTranslation.target}</option>
												</select>
											</div>

											<input type="text" placeholder="Search for a word..." className="dict-search" id='search-input' name="search" />
											<input type="button" value=" " className="form-submit dark-button" onClick={this.dictionarySearch} />
										</form>
										
										<div id="dictionary-results" />
										
									</div>

								</section>

							</div>
							<div id="edit-area">
								<textarea placeholder="Insert your translation here">
								</textarea>
							</div>
						</div>

						<div className="progress-wrapper">
							<h2>Status</h2>
							<div className="progress-bar-outer">
								<div className="progress-bar-inner" style={{width: this.state.currentTranslation.status + "%"}}>
									{this.state.currentTranslation.status}%
								</div>
							</div>
						</div>

						<div id="edit-control-wrapper">

							<div id="edit-buttons-wrapper">
								<p>What do you want to do with this translation?</p>
								<a className="dark-link" href={newLink} title="Save and Continue">Save and Continue</a>
								<a className="light-link" href="/translator" title="Cancel">Cancel</a>
							</div>
						</div>

					</div>
				</div>

			</div>
		);
	}
}