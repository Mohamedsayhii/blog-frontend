import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Overview = styled.div`
	.title {
		color: green;
		font-size: 5rem;
	}

	.mini-title {
		text-align: left;
	}

	#createPostBtn {
		padding: 1rem 2rem;
		margin: 1rem 0;
		font-size: 1.4rem;
		font-weight: bold;
		background-color: green;
		color: white;
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
	const [activePostId, setActivePostId] = useState(null);

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

	const handleCommentsToggle = (postId) => {
		activePostId === postId
			? setActivePostId(null)
			: setActivePostId(postId);
	};

	const deletePost = async (postId) => {
		if (window.confirm('Are you sure you want to delete this post?')) {
			await fetch(`http://localhost:3000/posts/${postId}`, {
				method: 'DELETE',
			});
			location.reload();
		}
	};

	const deleteComment = async (commentId) => {
		if (window.confirm('Are you sure you want to delete this comment?')) {
			await fetch(`http://localhost:3000/comments/${commentId}`, {
				method: 'DELETE',
			});
			location.reload();
		}
	};

	return (
		<Overview>
			<h1 className='title'>Your Blog</h1>
			<Link to='postform'>
				<button id='createPostBtn'>Create Post</button>
			</Link>
			<h1 className='mini-title'>Posts</h1>
			{posts.map((post) => (
				<Post key={post.id}>
					<div className='post-header'>
						<h2>{post.title}</h2>
						<div className='buttons'>
							<Link to='postform'>
								<button>Edit Post</button>
							</Link>
							<button onClick={() => deletePost(post.id)}>
								Delete Post
							</button>
							<button
								onClick={() => handleCommentsToggle(post.id)}
							>
								{activePostId === post.id
									? 'Hide Comments'
									: 'Show Comments'}
							</button>
						</div>
					</div>
					{activePostId === post.id &&
						(comments.filter(
							(comment) => comment.postId === activePostId
						).length > 0 ? (
							<div className='comments'>
								{comments
									.filter(
										(comment) => comment.postId === post.id
									)
									.map((comment) => (
										<div
											key={comment.id}
											className='comment'
										>
											<h4>{comment.author}</h4>
											<button
												onClick={() =>
													deleteComment(comment.id)
												}
											>
												Delete Comment
											</button>
										</div>
									))}
							</div>
						) : (
							<p>No comments for this post yet.</p>
						))}
				</Post>
			))}
			<Outlet />
		</Overview>
	);
}

export default BlogOverview;
