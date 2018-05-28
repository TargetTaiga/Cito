const fs = require('fs');

function makeBodyContent({ rootId, global, data, inline, vendor, react, reactDOM }) {
	const root = `<div id="${rootId}"></div>`;
	const evalScript = `<script>ReactDOM.render(React.createElement(__PAGE_CONTENT__, JSON.parse('${JSON.stringify(data)}')),document.getElementById('${rootId}'));</script>`;
	const inlineScript = `<script>${inline}</script>`;
	const vendorScript = `<script src="${vendor}"></script>`;
	const reactScript = `<script>${react}</script>`;
	const reactDOMScript = `<script>${reactDOM}</script>`;
	return `${root}${vendorScript}${reactScript}${reactDOMScript}${inlineScript}${evalScript}`;
}

function fsReadPromise(path) {
	return new Promise(((resolve) => {
		fs.readFile(path, (err, file) => {
			if (err) throw err;
			resolve(file);
		})
	}));
}

module.exports = {
	makeBodyContent,
	fsReadPromise
};