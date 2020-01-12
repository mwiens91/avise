import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import './css/App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/bootstrap-material-design.min.css';
import AppNavBar from './components/AppNavBar';
import Home from './components/Home';
import User from './components/User';

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<AppNavBar />
					<Container>
						<Route exact path="/" component={Home} />
						<Route path="/user" component={User} />
					</Container>
				</Router>
			</div>
		);
	}
}

export default App;
