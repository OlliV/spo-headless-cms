const fetch = require('isomorphic-unfetch');
const getToken = require('./get-token');

async function findSites(searchTerm) {
	const { token_type, access_token } = await getToken();
	const res = await fetch(`https://graph.microsoft.com/v1.0/sites?search=${encodeURIComponent(searchTerm)}`, {
		headers: {
			Authorization: `${token_type} ${access_token}`
		}
	});
	const body = await res.json();

	if (!res.ok) {
		const { error } = body;
		const err = new Error('Search failed');

		err.originalError = error;

		throw err;
	}


	return body;
}
module.exports = findSites;

if (require.main === module) {
	const searchTerm = process.argv.slice(2).join(' ');

	findSites(searchTerm)
		.then((body) => console.log(JSON.stringify(body, null, 2)))
		.catch(console.error);
}
