import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

class EditUserModal extends Component {
	state = {
		modal: false,
		discord_id: this.props.user.discord_id ? this.props.user.discord_id : null,
		track_nicotine: this.props.user.track_nicotine,
		track_alcohol: this.props.user.track_alcohol,
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal,
			track_nicotine: this.props.user.track_nicotine,
			track_alcohol: this.props.user.track_alcohol,
		});
	};

	onChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: value });
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
						Edit
					</Button>
				</div>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Update Preferences</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="Discord_id">Discord ID</Label>
								<Input
									type="text"
									name="discord_id"
									id="discord_id"
									className="mb-3"
									onChange={this.onChange}
								/>
								<FormGroup check>
									<Label check>
										<Input
											type="checkbox"
											name="track_nicotine"
											id="track_nicotine"
											checked={this.state.track_nicotine}
											onChange={this.onChange}
										/>Track Nicotine
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input
											type="checkbox"
											name="track_alcohol"
											id="track_alcohol"
											checked={this.state.track_alcohol}
											onChange={this.onChange}
										/>Track Alcohol
									</Label>
								</FormGroup>
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

export default EditUserModal;
