import React from 'react';
import 'react-dom';

export default (...args) => (
	<div>
		Page w/o components
		{JSON.stringify(args)}
	</div>
);