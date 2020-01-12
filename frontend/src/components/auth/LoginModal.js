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
	Alert,
} from 'reactstrap';

class LoginModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			modal: false,
		};
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
		this.props.clearErrors();
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const { username, password } = this.state;
		const data = {
			username,
			password,
		};

		this.props.login(data);

		if (this.props.error !== '') {
			// Should only toggle if login is successful
			this.toggle();
		}
	};

	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#" className="text-link">
					Login
				</NavLink>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Login</ModalHeader>
					<ModalBody>
						{this.props.error && <Alert color="danger">{this.props.error}</Alert>}
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
								<Label for="password">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Button color="success" outline style={{ marginTop: '2rem' }} block>
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
