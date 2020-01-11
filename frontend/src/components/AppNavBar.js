import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
	NavLink,
} from 'reactstrap';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';

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

	login = () => {
		e.preventDefault();

		this.setState({
			isAuth: true,
		});
	};

	render() {
		const guestLinks = (
			<Fragment>
				<NavItem>
					<LoginModal login={this.login} />
				</NavItem>
				<NavItem>
					<RegisterModal />
				</NavItem>
			</Fragment>
		);

		const authLinks = (
			<Fragment>
				<NavItem>
					<NavLink>Logout</NavLink>
				</NavItem>
			</Fragment>
		);
		return (
			<div>
				<Navbar color="dark" dark expand="sm" className="mb-5">
					<Container>
						<Router>
							<Route />
							<NavbarBrand href="/">AppName</NavbarBrand>
							<NavbarToggler onClick={this.toggle} />
							<Collapse isOpen={this.state.isOpen} navbar>
								<Nav className="ml-auto" navbar>
									{this.state.isAuth ? authLinks : guestLinks}
								</Nav>
							</Collapse>
						</Router>
					</Container>
				</Navbar>
			</div>
		);
	}
}

export default AppNavBar;
