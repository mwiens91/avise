import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Bar,
	BarChart,
	ReferenceLine,
} from 'recharts';

class Substance extends Component {
	state = {};
	render() {
		console.log(this.props.substances);

		return (
			<div>
				<Row>
					<Col>
						<LineChart
							width={500}
							height={300}
							data={this.props.data}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
							<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
						</LineChart>
					</Col>
					<Col>
						<BarChart
							width={500}
							height={300}
							data={this.props.data}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<ReferenceLine y={0} stroke="#000" />
							<Bar dataKey="pv" stackId="a" fill="#8884d8" />
							<Bar dataKey="uv" stackId="a" fill="#82ca9d" />
						</BarChart>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Substance;
