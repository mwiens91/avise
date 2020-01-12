import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import './css/App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/bootstrap-material-design.min.css';
import AppNavBar from './components/AppNavBar';
import Home from './components/Home';
import User from './components/User';

import Api from './Api';

class App extends Component {
	state = {
		isAuth: false,
		user: null,
	};

	Api = new Api(process.env.REACT_APP_API_URL);

	login = async (data) => {
		const tokenJson = await this.Api.getApiTokenWithBasicAuth(data);
		localStorage.setItem('token', tokenJson.token);

		this.Api.setToken(tokenJson.token);

		try {
			const user = await this.Api.getUserFromApiToken();

			this.setState({
				isAuth: true,
				user: user,
			});
			localStorage.setItem('user', JSON.stringify(user));
		} catch (e) {
			this.logout();
		}
	};

	logout = () => {
		this.setState({
			isAuth: false,
			user: null,
		});
		this.Api.setToken(null);
		localStorage.removeItem('token');
		localStorage.setItem('user', null);
	};

	render() {
		const { isAuth, user } = this.state;
		return (
			<div>
				<Router>
					<AppNavBar isAuth={isAuth} user={user} login={this.login} logout={this.logout} />
					<Container>
						<Route exact path="/" component={Home} />
						<Route
							path="/user"
							render={(props) => <User {...props} isAuth={isAuth} user={user} />}
						/>
					</Container>
				</Router>
			</div>
		);
	}
}

export default App;
