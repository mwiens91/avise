import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

class EditVapeModal extends Component {
	state = {
		modal: false,
		strength: this.props.vape.strength,
		volume: this.props.vape.volume,
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal,
			strength: this.props.vape.strength,
			volume: this.props.vape.volume,
		});
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = (e) => {
		e.preventDefault();

		const { strength, volume } = this.state;

		const data = {
			id: this.props.vape.id,
			user: this.props.vape.user,
			volume: volume,
			strength: strength,
		};

		this.props.updateVape(data);
		this.toggle();
	};
	render() {
		return (
			<div>
				<div style={{ textAlign: 'right' }}>
					<Button onClick={this.toggle} outline color="info">
						Edit
					</Button>
				</div>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Update</ModalHeader>
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
									value={this.state.volume}
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
									value={this.state.strength}
									onChange={this.onChange}
								/>
								<Button color="info" outline style={{ marginTop: '2rem' }} block>
									Save
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default EditVapeModal;
