import HtmlToReactParser from 'html-to-react';
import ErrorPage from 'next/error';
import { getPagesList, getPage } from '../../lib/spo';

const { Parser } = HtmlToReactParser;
var htmlToReactParser = new Parser();

const Page = ({ page }) => {
	if (!page) {
		return <ErrorPage statusCode={404} />;
	}

	const author = page.createdBy.user.displayName;
	const date = `${new Date(page.lastModifiedDateTime)}`;

	return (
		<>
			<h1>{page.title}</h1>
			<b>{author}</b> <small>{date}</small>
			{page.webParts.length > 0
				? page.webParts
					.filter((part) => part.type === 'rte')
					.map((part, i) => (<div key={`rte_part_${i}`}>{htmlToReactParser.parse(part.data.innerHTML)}</div>))
				: null}
		</>
	);
};

export async function getStaticPaths() {
	console.log('Getting page index');

	const pages = await getPagesList();

	return {
		paths: pages.map((p) => `/post/${p.id}`),
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	console.log(`Getting page: ${params.pid}`);

	const page = await getPage(params.pid);

	if (!page) {
		throw new Error('Page not found');
	}

	return { props: { page } };
}

export default Page;
