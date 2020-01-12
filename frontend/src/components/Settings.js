import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';

class Settings extends Component {
	render() {
		const { isAuth, user } = this.props;
		if (!isAuth) {
			return <Redirect to="/" />;
		}
		if (user.track_nicotine) {
			return user.vape ? (
				<div>
					<Card>
						<CardBody>
							<Row>
								<Col>
									<div>
										<h1 style={{ fontSize: '2rem' }}>Vape Settings</h1>
									</div>
								</Col>
								<Col>
									<div style={{ textAlign: 'right' }}>
										<Button outline color="info">
											Edit
										</Button>
									</div>
								</Col>
							</Row>
							<ul>
								<li>Strength: {user.vape.strength}</li>
								<li>Volume: {user.vape.volume}</li>
							</ul>
						</CardBody>
					</Card>
				</div>
			) : (
				<div>
					<Card>
						<CardBody>
							<CardTitle style={{ fontSize: '2rem' }}>Set vape settings</CardTitle>
						</CardBody>
					</Card>
				</div>
			);
		}
		return (
			<div>
				<h1>User Settings</h1>
			</div>
		);
	}
}

export default Settings;
