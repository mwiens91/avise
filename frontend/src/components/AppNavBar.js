import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Container } from 'reactstrap';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import '../css/App.css';

class AppNavBar extends Component {
	state = {
		isOpen: false,
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};

	login = (data) => {
		this.props.login(data);
	};

	logout = () => {
		this.props.logout();
	};

	clearErrors = () => {
		this.props.clearErrors();
	};

	register = (data) => {
		this.props.register(data);
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
					<LoginModal login={this.login} error={this.props.error} clearErrors={this.clearErrors} />
				</NavItem>
				<NavItem>
					<RegisterModal
						register={this.register}
						error={this.props.error}
						clearErrors={this.clearErrors}
					/>
				</NavItem>
			</Fragment>
		);
		const username = this.props.user ? this.props.user.username : '';

		const authLinks = (
			<Fragment>
				<NavItem>
					<Link to="/settings" className="nav-link text-link">
						<strong>{username}</strong>
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
							<img src="/favicon1.ico" width="50" height="50" alt="" />
							<strong> Avise</strong>
						</Link>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="mr-auto" navbar>
								{this.props.isAuth ? (
									<NavItem>
										{' '}
										<Link to="/user" className="nav-link text-link">
											{' '}
											Tracking{' '}
										</Link>{' '}
									</NavItem>
								) : (
									''
								)}
							</Nav>
							<Nav className="navbar-right" navbar>
								{this.props.isAuth ? authLinks : guestLinks}
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}

export default AppNavBar;
