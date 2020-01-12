import React, { Component } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import Substance from './Substance';

class User extends Component {
	state = {
		data: [],
	};

	render() {
		const substances = [ 'Alcohol', 'Nicotine' ];
		return (
			<div>
				<Card>
					<CardBody>
						<CardTitle style={{ fontSize: '2rem' }}>Nicotine</CardTitle>
						<CardBody>
							<Substance />;
						</CardBody>
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default User;
