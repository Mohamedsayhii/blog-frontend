import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Overview = styled.div`
	.title {
		color: green;
		font-size: 5rem;
	}

	.mini-title {
		text-align: left;
	}
`;

const Post = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem 0;

	.post-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.buttons {
		display: flex;
		gap: 1rem;
		button {
			padding: 1rem 2rem;
			font-size: 1.2rem;
			font-weight: bold;
		}
	}

	.comments {
		text-align: left;
		margin-top: 1rem;
		padding-left: 2rem;
		border-left: 2px solid #ccc;

		.comment {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem;
		}
	}
`;

function BlogOverview() {
	const [posts, setPosts] = useState([]);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const dataFetch = async () => {
			Promise.all([
				fetch(`http://localhost:3000/posts`).then((res) => res.json()),
				fetch(`http://localhost:3000/comments`).then((res) =>
					res.json()
				),
			]).then(([postData, commentsData]) => {
				setPosts(postData);
				setComments(commentsData);
			});
		};

		dataFetch();
	}, []);

	console.log(comments);

	return (
		<Overview>
			<h1 className='title'>Your Blog</h1>
			<h1 className='mini-title'>Posts</h1>
			{posts.map((post) => (
				<Post key={post.id}>
					<div className='post-header'>
						<h2>{post.title}</h2>
						<div className='buttons'>
							<button>Edit Post</button>
							<button>Delete Post</button>
							<button>Show Comments</button>
						</div>
					</div>
				</Post>
			))}
		</Overview>
	);
}

export default BlogOverview;
