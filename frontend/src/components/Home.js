import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import { Card, CardBody, Row, Col } from 'reactstrap';
import '../css/App.css';

class Home extends Component {
	render() {
		return (
			<div>
				<Jumbotron className="jumbo-color">
					<h1 className="display-3 work-sans">Avise</h1>
					<p className="lead">
						Inform people on the impacts of their substance use and help them reach their goals.
					</p>
					<hr className="my-2" />
					<p>
						Avise was created to help inform users of the effects substances have on their
						health. This is achieved through
					</p>
					<ul>
						<li>integrating bots on popular messaging services to conventiently track user data;</li>
						<li>providing real-time visualizations of users' consumption of potentially harmful substances;</li>
						<li>citing research tailored to the users' personal usage patterns;</li>
					</ul>
					<p>
						Avise provides a convenient and powerful platform for people who consume substances to do so
						in an informed and responsible way.
					</p>
				</Jumbotron>

				<Row>
					<Col>
						<Card>
							<h1 className="mt-3" style={{ fontSize: '1.5rem', textAlign: 'center' }}>
								Avi the bot
							</h1>
							<img
								style={{
							        textAlign: 'center',
								display: 'block',
								justifyContent: 'center',
								alignItems: 'center',
								margin: 'auto',
								}}
								src="/avise/Jump_11.png" width="100px"/>
							<CardBody>
								<p>
								Avi is a multi-platform messaging bot designed to interpret conversional language.
								Avi tracks substances consumption data and sends it to Avise's REST API.
								</p>
							</CardBody>
						</Card>
					</Col>

					<Col>
						<Card>
							<h1 className="mt-3" style={{ fontSize: '1.5rem', textAlign: 'center' }}>
								avise.tech
							</h1>
							<img
								style={{
							        textAlign: 'center',
								display: 'block',
								justifyContent: 'center',
								alignItems: 'center',
								margin: 'auto',
								}}
								src="/avise/favicon1.ico" width="86px"/>
							<CardBody>
								<p>
								<a href="">avise.tech</a> provides analytics and visualizations personalized for users'
								unique data and history.								</p>
							</CardBody>
						</Card>
					</Col>
					<Col>
						<Card>
							<h1 className="mt-3" style={{ fontSize: '1.5rem', textAlign: 'center' }}>
								 Powered by research
							</h1>
							<img
								style={{
							        textAlign: 'center',
								display: 'block',
								justifyContent: 'center',
								alignItems: 'center',
								margin: 'auto',
								}}
								src="https://image.flaticon.com/icons/svg/2452/2452520.svg" width="86px"/>
							<CardBody>
								Avise
								provides peer-reviewed articles about potential health risks based on users'
								substance use data.
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Home;
