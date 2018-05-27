const html = ({inline, vendor, data = null}) => {
	const doctype = `<!DOCTYPE html>`;
	const meta = `<meta charSet="UTF-8">`; // TODO generate meta
	const head = `<head>${meta}<title>Title</title></head>`;
	const root = `<div id="root"></div>`;
	const evalScript = `<script>ReactDOM.render(React.createElement(__PAGE_COMPONENT__, JSON.parse('${data}')),document.getElementById('root'));</script>`;
	const inlineScript = `<script>${inline}</script>`;
	const vendorScript = `<script src="${vendor}"></script>`;
	const body = `<body>${root}${vendorScript}${inlineScript}${evalScript}</body>`;

	return `${doctype}<html lang="en">${head}${body}</html>`;
};

module.exports = html;