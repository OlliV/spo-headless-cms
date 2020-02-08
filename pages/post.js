import HtmlToReactParser from 'html-to-react';
import ErrorPage from 'next/error'
import { useRouter } from 'next/router';
import getPages from '../lib/get-pages';

const { Parser } = HtmlToReactParser;
var htmlToReactParser = new Parser();

const Page = ({ pages }) => {
	const router = useRouter();
	const pageId = router.query.pageId;

	if (pageId.length > 100) {
		return <ErrorPage statusCode={400} />
	}

	const page = pages.find((p) => p.id === pageId);
	if (!page) {
		return <ErrorPage statusCode={404} />
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

Page.getInitialProps = async function() {
	return { pages: await getPages() };
};

export default Page;
