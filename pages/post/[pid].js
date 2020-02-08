import HtmlToReactParser from 'html-to-react';
import ErrorPage from 'next/error';
import getPages from '../../lib/get-pages';

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

export async function unstable_getStaticPaths() {
	console.log('Getting page index');

	const pages = await getPages();

	return pages.map((p) => `/post/${p.id}`);
}

export async function unstable_getStaticProps({ params }) {
	console.log(`Getting page: ${params.pid}`);

	const pages = await getPages();

	const page = pages.find((p) => p.id === params.pid);

	if (!page) {
		throw new Error('Page not found');
	}

	return { props: { page } };
}

export default Page;
