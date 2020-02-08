import Head from 'next/head';
import Post from '../components/post';
import getPages from '../lib/get-pages';

const Index = ({ pages }) => (
	<>
		<Head>
			<title>Next.js + SharePoint Online</title>
				<link
					rel="stylesheet"
					href="https://css.zeit.sh/v1.css"
					type="text/css"
				/>
		</Head>
		{pages.length > 0
			? pages.map(p => (
				<Post
					key={p.id}
					page={p}
				/>
			))
			: null}
	</>
)

Index.getInitialProps = async function() {
	return { pages: await getPages() };
};

export default Index
