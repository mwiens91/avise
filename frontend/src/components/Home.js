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
						Inform people on the impacts of their substance use and help them reach whatever goals
						they have.
					</p>
					<hr className="my-2" />
					<p>
						Avise was created to help inform users of the effects of various substances on their
						health. While not designed specifically as a quitting aid, avise may be used to
						supplement other tools and resources for cessation.
					</p>
				</Jumbotron>

				<Row>
					<Col>
						<Card>
							<h1 className="mt-3" style={{ fontSize: '1.5rem', textAlign: 'center' }}>
								Card 1
							</h1>
							<CardBody>
								Phasellus quis tincidunt nisl. Mauris aliquet sollicitudin sapien, at blandit quam
								eleifend nec. Ut non aliquet est.
							</CardBody>
						</Card>
					</Col>

					<Col>
						<Card>
							<h1 className="mt-3" style={{ fontSize: '1.5rem', textAlign: 'center' }}>
								Card 2
							</h1>
							<CardBody>
								Phasellus quis tincidunt nisl. Mauris aliquet sollicitudin sapien, at blandit quam
								eleifend nec. Ut non aliquet est.
							</CardBody>
						</Card>
					</Col>
					<Col>
						<Card>
							<h1 className="mt-3" style={{ fontSize: '1.5rem', textAlign: 'center' }}>
								Card 3
							</h1>
							<CardBody>
								Phasellus quis tincidunt nisl. Mauris aliquet sollicitudin sapien, at blandit quam
								eleifend nec. Ut non aliquet est.
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Home;
