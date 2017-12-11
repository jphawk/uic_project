import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import DataModule from '../DataModule';

export default class ConfirmationPage extends Component {    

  render() {
    return (
      <div className="App">
				<p>When the translator exists translation: submit or save? {this.props.match.params.translationid}</p>
      </div>
    );
  }
}