import fetch from 'isomorphic-unfetch';

const BASE_URL = 'https://graph.microsoft.com/beta';

export async function getPagesList() {
	const filter = `pageLayout eq 'Article' and publishingState/level eq 'published'`;
	const select = 'id,title,createdBy,lastModifiedDateTime,pageLayout,publishingState'
	const res = await fetch(`${BASE_URL}/sites/${process.env.SITE_ID}/pages?$filter=${filter}&$select=${select}`, {
		headers: {
			Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
		}
	});

	if (res.status !== 200) {
		throw new Error(`Failed to list pages: ${res.statusText}`);
	}

	const { value: pages } = await res.json();

	// console.log('Pages:', JSON.stringify(pages, null, 2))

	return pages;
}

export async function getPage(pageId) {
	const res = await fetch(`${BASE_URL}/sites/${process.env.SITE_ID}/pages/${pageId}`, {
		headers: {
			Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
		}
	});

	if (res.status !== 200) {
		throw new Error(`Failed to get a page: ${res.statusText}`);
	}

	return res.json();
}

// We can also get just the webParts but it remains a mystery how to expand the
// instances:
// /pages/${pageId}/webParts
