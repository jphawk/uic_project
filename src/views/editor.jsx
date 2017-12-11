import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import App from '../App';
import './css/styles.css';
import DataModule from '../DataModule';

export default class EditorPage extends Component { 	

  render() {

		return (
      <div className="App">
				<p>Here is where the translation is being done {this.props.match.params.translationid} {DataModule.translation}</p>
      </div>
    );
  }
}