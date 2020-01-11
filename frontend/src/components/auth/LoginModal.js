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

class LoginModal extends Component {
	state = {
		modal: false,
		email: '',
		password: '',
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

		const { email, password } = this.state;

		const user = {
			email,
			password,
		};
	};

	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#">
					Login
				</NavLink>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Login</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
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
								<Button color="dark" style={{ marginTop: '2rem' }} block>
									Login
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}
export default LoginModal;
