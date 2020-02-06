const fs = require('fs');
const fetch = require('isomorphic-unfetch');

const {
	tenantId,
	clientId,
	clientSecret
} = readConfig();

function readConfig() {
	const data = fs.readFileSync('./tenant.json');

	if (data) {
		return JSON.parse(data);
	} else {
		throw new Error(`JSON parsing error: ${parametersFile}`);
	}
}


async function getToken() {
	const res = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: `client_id=${clientId}&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default&client_secret=${clientSecret}&grant_type=client_credentials`
	});

	return res.json();
}

getToken().then(console.log).catch(console.error);
