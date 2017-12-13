import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import Header from './header';

export default class EditorPage extends Component { 	

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
						<h1>Instructions for a German travel card</h1>
						<p><b>Requestor:</b> Alan Muller</p>

						<p><b>Requestor's email:</b> alan.muller@gmail.com</p>

						<div id="edit-radio-wrapper">
							<form id="edit-form-wrapper" action="/">
								<label class="tooltip">On-hover Dictionary settings 
									<span class="tooltiptext">You can highlight a word in Original and Auto translated text to get a translation for it.</span>
								</label>
								<input id="dt-definition" type="radio" name="dictionary-switch" value="Definition" checked/>
								<label for="dt-definition">Definition</label>
								<input id="dt-word" type="radio" name="dictionary-switch" value="Word-to-word"/>
								<label for="dt-word">Word-to-word</label>
							</form>
						</div>

						<div id="edit-wrapper">
							<div id="edit-tabs">

								<input id="tab1" type="radio" name="tabs" checked />
								<label for="tab1">Original</label>

								<input id="tab2" type="radio" name="tabs" />
								<label for="tab2">Auto Translation</label>

								<input id="tab3" type="radio" name="tabs" />
								<label for="tab3">Dictionary</label>

								<section id="content1">
									<p>
										Bacon ipsum dolor sit amet beef venison beef ribs kielbasa. Sausage pig leberkas, t-bone sirloin shoulder bresaola. Frankfurter rump porchetta ham. Pork belly prosciutto brisket meatloaf short ribs.
									</p>
									<p>
										Brisket meatball turkey short loin boudin leberkas meatloaf chuck andouille pork loin pastrami spare ribs pancetta rump. Frankfurter corned beef beef tenderloin short loin meatloaf swine ground round venison.
									</p>
								</section>

								<section id="content2">
									<p>
										Bacon ipsum dolor sit amet landjaeger sausage brisket, jerky drumstick fatback boudin ball tip turducken. Pork belly meatball t-bone bresaola tail filet mignon kevin turkey ribeye shank flank doner cow kielbasa shankle. Pig swine chicken hamburger, tenderloin turkey rump ball tip sirloin frankfurter meatloaf boudin brisket ham hock. Hamburger venison brisket tri-tip andouille pork belly ball tip short ribs biltong meatball chuck. Pork chop ribeye tail short ribs, beef hamburger meatball kielbasa rump corned beef porchetta landjaeger flank. Doner rump frankfurter meatball meatloaf, cow kevin pork pork loin venison fatback spare ribs salami beef ribs.
									</p>
									<p>
										Jerky jowl pork chop tongue, kielbasa shank venison. Capicola shank pig ribeye leberkas filet mignon brisket beef kevin tenderloin porchetta. Capicola fatback venison shank kielbasa, drumstick ribeye landjaeger beef kevin tail meatball pastrami prosciutto pancetta. Tail kevin spare ribs ground round ham ham hock brisket shoulder. Corned beef tri-tip leberkas flank sausage ham hock filet mignon beef ribs pancetta turkey.
									</p>
								</section>

								<section id="content3">

									<h2>Dictionary</h2>
									<div id="dictionary-wrapper">
										<form action="search">
											<h3>Translate</h3>
											<div id="dictionary-float">
												<select className="df-input classic">
													<option value="" disabled selected>From</option>
												</select>
												<select className="df-input classic">
													<option value="" disabled selected>To</option>
												</select>
											</div>

											<input type="text" placeholder="Search for a word..." className="dict-search" name="search" />
											<input type="submit" value=" " className="form-submit dark-button" />
										</form>
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
								<div className="progress-bar-inner">
									25%
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