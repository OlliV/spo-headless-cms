import Head from 'next/head';
import Post from '../components/post';
import { getPagesList } from '../lib/spo';

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

export async function getStaticProps() {
	return { props: { pages: await getPagesList() } };
}

export default Index;
