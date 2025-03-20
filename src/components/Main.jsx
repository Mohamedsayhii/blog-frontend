import { useEffect, useState } from 'react';
import Bio from './Bio';
import PostPreview from './PostPreview';

function Main() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/posts/')
			.then((res) => res.json())
			.then((json) => setPosts(json));
	}, []);

	return (
		<>
			<Bio />
			<div>
				{posts.map(
					(post) =>
						post.published && (
							<PostPreview
								key={post.id}
								id={post.id}
								title={post.title}
								content={post.content}
								date={post.date}
							/>
						)
				)}
			</div>
		</>
	);
}

export default Main;
