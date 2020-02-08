import fetch from 'isomorphic-unfetch';

let p;

export default async function getPages() {
	if (!p) {
		const get = async () => {
			const filter = `pageLayout eq 'Article' and publishingState/level eq 'published'`;
			const res = await fetch(`https://graph.microsoft.com/beta/sites/${process.env.SITE_ID}/pages?$filter=${filter}`, {
				headers: {
					Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
				}
			});

			const { value: pages } = await res.json();

			//console.log(JSON.stringify(pages, null, 2))

			return pages;
		}

		p = get();
	}

	return p;
}
