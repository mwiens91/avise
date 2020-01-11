import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar';

class App extends Component {
	render() {
		return (
			<div>
				<AppNavBar />
				<Container>
					<h1>Hello World</h1>
				</Container>
			</div>
		);
	}
}

export default App;
