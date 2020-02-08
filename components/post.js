import Link from 'next/link';

function Post({ page }) {
	const {
		id: pageId,
		title: pageTitle
	} = page;
	const path = page.webUrl.substring(9, page.webUrl.length - 5);
	const author = page.createdBy.user.displayName;
	const date = `${new Date(page.lastModifiedDateTime)}`;

	return (
		<div className="container">
			<div className="text">
				<h2><Link href={`/post?pageId=${pageId}`} as={path}><a>{pageTitle}</a></Link></h2>
				<h4>{author}</h4>
				<small>{date}</small>
			</div>
		</div>
	);
}

export default Post;
