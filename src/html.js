const html = ({inline, vendor, react, reactDOM, data = null, title = 'W/o title'}) => {
	const doctype = `<!DOCTYPE html>`;
	const meta = `<meta charSet="UTF-8">`; // TODO generate meta
	const head = `<head>${meta}<title>${title}</title></head>`;
	const root = `<div id="root"></div>`;
	const evalScript = `<script>ReactDOM.render(React.createElement(__PAGE_CONTENT__, JSON.parse('${data}')),document.getElementById('root'));</script>`;
	const inlineScript = `<script>${inline}</script>`;
	const vendorScript = `<script src="${vendor}"></script>`;
	const reactScript = `<script>${react}</script>`;
	const reactDOMScript = `<script>${reactDOM}</script>`;
	const body = `<body>${root}${vendorScript}${reactScript}${reactDOMScript}${inlineScript}${evalScript}</body>`;

	return `${doctype}<html lang="en">${head}${body}</html>`;
};

module.exports = html;