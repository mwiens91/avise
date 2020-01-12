import React, { Component, Fragment } from 'react';
import { Jumbotron } from 'reactstrap';
import '../css/App.css';

class Home extends Component {
	render() {
		return (
			<Fragment>
				<Jumbotron>
					<h1 className="display-3 work-sans">Avise</h1>
					<p className="lead">
						Phasellus quis tincidunt nisl. Mauris aliquet sollicitudin sapien, at blandit quam
						eleifend nec. Ut non aliquet est.
					</p>
					<hr className="my-2" />
					<p>
						Avise was created to help inform users of the effects of various substances on their
						health and on the environment. Notably, the recent rise in popularity of vaping devices
						in developed countries is of growing concern, especially amongst younger population
						groups. Cigarette use is also considered, due to the continuously high rate of cigarette
						smokers in developing countries. Additionally, a number of countries are pushing to
						publish warnings on alcohol containers about the correlation between alcohol and certain
						types of cancer. While not designed specifically as a quitting aid, avise may be used to
						supplement other tools and resources for cessation.
					</p>
				</Jumbotron>
			</Fragment>
		);
	}
}

export default Home;
