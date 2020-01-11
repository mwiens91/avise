import React, { Component, Fragment } from 'react';
import { Jumbotron } from 'reactstrap';

class Home extends Component {
	render() {
		return (
			<Fragment>
				<Jumbotron>
					<h1 className="display-3">AppName</h1>
					<p className="lead">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie arcu nisl, eu
						vehicula neque venenatis in. Cras fermentum leo eget lobortis eleifend.
					</p>
					<hr className="my-2" />
					<p>
						Phasellus quis tincidunt nisl. Mauris aliquet sollicitudin sapien, at blandit quam
						eleifend nec. Ut non aliquet est.
					</p>
				</Jumbotron>
			</Fragment>
		);
	}
}

export default Home;
