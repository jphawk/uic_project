import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import Header from './header';

export default class TranslatorPage extends Component {    
	
	viewTranslationDetails = (translationId) => {
		this.props.history.push('/translation/' + translationId);
	}

	render() {
		return (
			<div>
				<Helmet>
					<meta charset="utf-8" />
					<title>Translator's Dashboard</title>
					<meta name="description" content="Requestor's Dashboard" />
					<meta name="author" content="Team Translator" />
				</Helmet>

				<Header />

				<div id="page-rq-dashboard" className="page">
					<div id="content" className="dashboard">
						<h1>Dashboard</h1>
						<h2>Your active translations</h2>
						<div id="tr-table-wrapper">
							<table id="tr-table">
								<tbody>
								<tr>
									<th colSpan="4">From German to Finnish</th>
								</tr>
								<tr>
									<th style={{width: 120}}>
										Request's name
									</th>
									<th style={{width: 120}}>
										Request's status
									</th>
									<th style={{width: 80}}>
										Word count
									</th>
									<th>
										Text sample
									</th>
								</tr>
								<tr onClick= {() => { this.viewTranslationDetails(23)}}>
									<td>My translation</td>
									<td>80% ready</td>
									<td>1623</td>
									<td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </td>
								</tr>
								</tbody>
							</table>
						</div>

						<div id="tr-form-wrapper">
							<h2>Browse for new translation requests</h2>

							<form accepted-charset="UTF-8" method="post" id="tr-form" className="webform-processed">

								<div className="label-input-wrapper one">
									<label>Source language</label>
									<input type="text" name="lng-from-tr" className="rq-input" size="60" placeholder="From" autoComplete="OFF" />
								</div>

								<div className="label-input-wrapper two">
									<label>Target language</label>
									<input type="text" name="lng-to-tr" className="rq-input" size="60" placeholder="To" autoComplete="OFF" />
								</div>
								<div className="submit-wrapper">
									<input type="submit" value="Search" className="form-submit dark-button" />
								</div>
							</form>
						</div>


						<div id="tr-search-wrapper">
							<table id="search-table">
								<tbody>
								<tr>
									<th style={{width: "120"}}>
										Request's name
									</th>
									<th style={{width: "120"}}>
										Request's status
									</th>
									<th style={{width: "80"}}>
										Word count
									</th>
									<th>
										Text sample
									</th>
								</tr>
								<tr>
									<td>Documents for new ID</td>
									<td>20% ready</td>
									<td>2023</td>
									<td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </td>
								</tr>
								<tr>
									<td>Documents for new travel card</td>
									<td>30% ready</td>
									<td>520</td>
									<td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </td>
								</tr>
								<tr>
									<td>University instructions</td>
									<td>30% ready</td>
									<td>230</td>
									<td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </td>
								</tr>
								</tbody>
							</table>
						</div>


					</div>
				</div>

			</div>
		);
	}
}