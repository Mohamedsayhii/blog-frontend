import { useEffect, useState } from 'react';
import Bio from './Bio';
import PostPreview from './PostPreview';

function Main() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch('https://definite-etheline-ms-personal-73ef4f8e.koyeb.app/posts/')
			.then((res) => res.json())
			.then((json) => setPosts(json));
	}, []);

	return (
		<>
			<Bio title={true} />
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
