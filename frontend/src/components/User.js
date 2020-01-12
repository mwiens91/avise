import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap';
import Substance from './Substance';

class User extends Component {
	state = {
		substances: [ 'Alcohol', 'Nicotine' ],
		data: [
			{
				name: 'Page A',
				uv: 4000,
				pv: 2400,
			},
			{
				name: 'Page B',
				uv: 3000,
				pv: 1398,
			},
			{
				name: 'Page C',
				uv: 2000,
				pv: 9800,
			},
			{
				name: 'Page D',
				uv: 2780,
				pv: 3908,
			},
		],
	};

	render() {
		if (!this.props.isAuth) {
			return <Redirect to="/" />;
		}
		return (
			<div>
				<Card>
					<CardBody>
						<CardTitle style={{ fontSize: '2rem' }}>Nicotine</CardTitle>
						<CardBody>
							<Substance data={this.state.data} substances={this.state.substances} />
						</CardBody>
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default User;
