import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	NavLink,
} from 'reactstrap';
import '../../css/App.css';

class RegisterModal extends Component {
	state = {
		modal: false,
		username: '',
		email: '',
		password: '',
		confirm_password: '',
		msg: null,
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const { username, email, password, confirm_password } = this.state;

		const data = {
			username,
			email,
			password,
			confirm_password,
		};

		this.props.register(data);
	};

	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#" className="text-link">
					Register
				</NavLink>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Register</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="username">Username</Label>
								<Input
									type="text"
									name="username"
									id="username"
									placeholder="Username"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Label for="email">Email</Label>
								<Input
									type="email"
									name="email"
									id="email"
									placeholder="Email"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Label for="password">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Label for="confirm_password">Confirm Password</Label>
								<Input
									type="password"
									name="confirm_password"
									id="confirm_password"
									placeholder="Confirm Password"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Button color="info" outline style={{ marginTop: '2rem' }} block>
									Register
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}
export default RegisterModal;
