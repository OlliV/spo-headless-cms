function Post({ title, author, date, url }) {
	return (
		<div className="container">
			<div className="text">
				<h2><a href={url}>{title}</a></h2>
				<h4>{author}</h4>
				<small>{date}</small>
			</div>
		</div>
	);
}

export default Post
