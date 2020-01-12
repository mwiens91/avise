import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';
import EditVapeModal from './EditVapeModal';
import CreateVapeModal from './CreateVapeModal';
import EditUserModal from './EditUserModal';

class Settings extends Component {
	updateVape = (data) => {
		this.props.updateVape(data);
	};

	createVape = (data) => {
		this.props.createVape(data);
	};

	render() {
		const { isAuth, user } = this.props;
		if (!isAuth) {
			return <Redirect to="/" />;
		}
		const currentVape = (
			<Fragment>
				<Card>
					<CardBody>
						<Row>
							<Col>
								<div>
									<h1 style={{ fontSize: '2rem' }}>Vape Settings</h1>
								</div>
							</Col>
							<Col>
								<EditVapeModal vape={user.vape} updateVape={this.updateVape} />
							</Col>
						</Row>
						<ul>
							<li>Strength: {user.vape.strength}</li>
							<li>Volume: {user.vape.volume}</li>
						</ul>
					</CardBody>
				</Card>
			</Fragment>
		);
		const setVape = (
			<Fragment>
				<Card>
					<CardBody>
						<Row>
							<Col>
								<div>
									<h1 style={{ fontSize: '2rem' }}>Set Vape Settings</h1>
								</div>
							</Col>
							<Col>
								<CreateVapeModal userId={user.id} createVape={this.createVape} />
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Fragment>
		);

		const vapeSettings = user.vape ? currentVape : setVape;

		const preferences = (
			<Fragment>
				<Card>
					<CardBody>
						<Row>
							<Col>
								<div>
									<h1 style={{ fontSize: '2rem' }}>Preferences</h1>
								</div>
							</Col>
							<Col>
								<EditUserModal user={user} />
							</Col>
						</Row>
						<ul>
							<li>Discord ID: {user.discord_id ? user.discord_id : 'Empty'}</li>
							<li>Track Nicotine: {user.track_nicotine ? 'True' : 'False'} </li>
							<li>Track Alcohol: {user.track_alcohol ? 'True' : 'False'}</li>
						</ul>
					</CardBody>
				</Card>
			</Fragment>
		);
		return (
			<div>
				{user.track_nicotine ? vapeSettings : ''}
				{preferences}
			</div>
		);
	}
}

export default Settings;
