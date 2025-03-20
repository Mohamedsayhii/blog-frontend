import { useParams } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';

function Post() {
	const { postId } = useParams();
	const [post, setPost] = useState();

	useEffect(() => {
		const postFetch = async () => {
			const data = await (
				await fetch(`http://localhost:3000/posts/${postId}`)
			).json();
			setPost(data);
		};

		postFetch();
	}, [postId]);

	if (!post) return 'LOADING';

	return (
		<>
			<Header />
			<h1>{post.title}</h1>
			<h4>{post.date}</h4>
			<p>{post.content}</p>
			<h4>About Mohamed Sayhi</h4>
			<p>
				AI Researcher. Currently working as a Software Developer at
				Vermeg and finishing my masters thesis - University of Monastir,
				Tunisia. CS enthusiast at general and Programming lover at
				heart.
			</p>
		</>
	);
}

export default Post;
