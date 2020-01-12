import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Container, NavLink } from 'reactstrap';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import '../css/App.css';

import Api from '../Api';

class AppNavBar extends Component {
	state = {
		isOpen: false,
		isAuth: false,
		user: null,
	};
	Api = new Api(process.env.REACT_APP_API_URL);

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};

	login = async (username, password) => {
		const data = {
			username,
			password,
		};
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

	register = (data) => {
		const { username, email, password, confirm_password } = data;

		// Make API request here, validate data and return errors when needed
	};

	componentDidMount() {
		if (localStorage.getItem('user')) {
			this.setState({
				isAuth: true,
				username: JSON.parse(localStorage.getItem('user')),
			});
		}
	}

	render() {
		const guestLinks = (
			<Fragment>
				<NavItem>
					<LoginModal login={this.login} />
				</NavItem>
				<NavItem>
					<RegisterModal register={this.register} />
				</NavItem>
			</Fragment>
		);

		const authLinks = (
			<Fragment>
				<NavItem>
					{/* Need to change the link to be the username */}
					<Link to="/user" className="nav-link text-link">
						<strong>{this.state.user ? this.state.user.username : ''}</strong>
					</Link>
				</NavItem>
				<NavItem>
					<Link to="#" onClick={this.logout} className=" nav-link text-link">
						Logout
					</Link>
				</NavItem>
			</Fragment>
		);
		return (
			<div>
				<Navbar dark expand="sm" className="mb-5 navbar-style">
					<Container>
						<Link to="/" className="navbar-brand text-link work-sans">
							<strong>Avise</strong>
						</Link>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								{this.state.isAuth ? authLinks : guestLinks}
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}

export default AppNavBar;
