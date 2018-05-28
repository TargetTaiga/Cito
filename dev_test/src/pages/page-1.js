import React from 'react';
import First from '../components/first';
import Second from '../components/second';

export default class Page extends React.Component {
	render() {
		return (
			<div>
				Some data: {JSON.stringify(this.props)};
				Page with 2 components:
				<First/>
				<Second/>
			</div>
		)
	}
}