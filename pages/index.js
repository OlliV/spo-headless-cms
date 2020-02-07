import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Post from '../components/post';

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
					title={p.title}
					author={p.createdBy.user.displayName}
					date={`${new Date(p.lastModifiedDateTime)}`}
					url={p.webUrl}
				/>
			))
			: null}
	</>
)

Index.getInitialProps = async function() {
	const filter = `pageLayout eq 'Article' and publishingState/level eq 'published'`;
	const res = await fetch(`https://graph.microsoft.com/beta/sites/${process.env.SITE_ID}/pages?$filter=${filter}`, {
		headers: {
			Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
		}
	});

	const { value: pages } = await res.json();

	return { pages };
};

export default Index
