import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap';
import Substance from './Substance';

class User extends Component {
	state = {
		track_nicotine: this.props.user.track_nicotine,
		track_alcohol: this.props.user.track_alcohol,
		nicotineData: [
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
		alcoholData: [
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
		const alcoholCharts = (
			<Fragment>
				<Card className="mb-3">
					<CardBody>
						<CardTitle style={{ fontSize: '2rem' }}>Alcohol</CardTitle>
					</CardBody>
				</Card>
				<Substance data={this.state.alcoholData} />
			</Fragment>
		);

		const nicotineCharts = (
			<Fragment>
				<Card className="mb-3">
					<CardBody>
						<CardTitle style={{ fontSize: '2rem' }}>Nicotine</CardTitle>
					</CardBody>
				</Card>
				<Substance data={this.state.nicotineData} />
			</Fragment>
		);

		return (
			<div>
				{this.state.track_alcohol ? alcoholCharts : ''}
				<hr />
				{this.state.track_nicotine ? nicotineCharts : ''}
			</div>
		);
	}
}

export default User;
