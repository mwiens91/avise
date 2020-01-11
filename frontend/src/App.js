import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar';
import Home from './components/Home';

class App extends Component {
	render() {
		return (
			<div>
				<AppNavBar />
				<Container>
					<Home />
				</Container>
			</div>
		);
	}
}

export default App;
