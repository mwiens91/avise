import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

class CreateVapeModal extends Component {
	state = {
		modal: false,
		strength: '',
		volume: '',
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal,
			strength: '',
			volume: '',
		});
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = (e) => {
		e.preventDefault();

		const { strength, volume } = this.state;

		const data = {
			user: this.props.userId,
			volume: volume,
			strength: strength,
		};

		this.props.createVape(data);
		this.toggle();
	};
	render() {
		return (
			<div>
				<div style={{ textAlign: 'right' }}>
					<Button onClick={this.toggle} outline color="info">
						Set
					</Button>
				</div>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Set Vape</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="Volume">Volume (mL)</Label>
								<Input
									min="0"
									type="number"
									name="volume"
									id="volume"
									placeholder="Volume"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Label for="Strength">Strength (mg/mL)</Label>
								<Input
									min="0"
									type="number"
									name="strength"
									id="strength"
									placeholder="Strength"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Button color="info" outline style={{ marginTop: '2rem' }} block>
									Set
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default CreateVapeModal;
