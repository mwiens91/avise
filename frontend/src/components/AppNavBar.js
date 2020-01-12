import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Container, NavLink } from 'reactstrap';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import '../css/App.css';

class AppNavBar extends Component {
	state = {
		isOpen: false,
		isAuth: false,
		username: null,
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};

	login = (username, password) => {
		// Authenticate here with API call

		this.setState({
			isAuth: true,
			username: username,
		});
		localStorage.setItem('user', JSON.stringify(username));
	};

	logout = () => {
		this.setState({
			isAuth: false,
			username: null,
		});
		localStorage.removeItem('user');
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
						<strong>{this.state.username ? this.state.username : ''}</strong>
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
				<Navbar expand="sm" className="mb-5 navbar-style">
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
