import { useParams } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';
import Bio from './Bio';
import moment from 'moment';
import styled from 'styled-components';
import Comment from './Comment';

const Wrapper = styled.div`
	.post {
		margin-top: 1.5rem;
		.date {
			font-size: 1.7rem;
			font-weight: 300;
			font-style: italic;
		}

		h1 {
			font-size: 5.5rem;
		}

		p {
			text-align: left;
			font-size: 2rem;
		}
	}
`;

const Comments = styled.div`
	margin-top: 1.5rem;
	text-align: left;
`;

const CommentForm = styled.form`
	margin-top: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	input,
	textarea {
		font-family: inherit;
		width: 100%;
		padding: 1rem;
		font-size: 1.6rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}

	textarea {
		min-height: 100px;
		resize: vertical;
	}

	button {
		padding: 1rem;
		font-size: 1.6rem;
		background: green;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.3s;
	}

	button:hover {
		background: #0056b3;
	}
`;

function Post() {
	const { postId } = useParams();
	const [post, setPost] = useState();
	const [comments, setComments] = useState([]);
	const [author, setAuthor] = useState('');
	const [text, setText] = useState('');

	useEffect(() => {
		Promise.all([
			fetch(`http://localhost:3000/posts/${postId}`).then((res) =>
				res.json()
			),
			fetch(`http://localhost:3000/posts/${postId}/comments`).then(
				(res) => res.json()
			),
		]).then(([postData, commentsData]) => {
			setPost(postData);
			setComments(commentsData);
		});
	}, [postId]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch(
			`http://localhost:3000/posts/${postId}/comments`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ author, text }),
			}
		);

		const data = await res.json();
		if (!res.ok) {
			console.log(data);
			throw new Error(data.message || 'Failed to add comment');
		}

		setComments([...comments, data]);
		setAuthor('');
		setText('');
	};

	if (!post) return 'LOADING';

	return (
		<Wrapper>
			<Header />
			<div className='post'>
				<h4 className='date'>
					{moment(post.date).format('MMMM Do YYYY')}
				</h4>
				<h1>{post.title}</h1>
				<p>{post.content}</p>
			</div>
			<Bio title={false} />
			{/* <div style={{ border: '1px solid #cccccc', width: '100%' }}></div> */}
			<Comments>
				<h1>{comments.length ? 'Comments' : ''}</h1>
				{comments.map((comment) => (
					<Comment
						key={comment.id}
						author={comment.author}
						text={comment.text}
						date={comment.date}
					/>
				))}
			</Comments>
			<h1>Add Comment</h1>
			<CommentForm onSubmit={handleSubmit}>
				<input
					type='text'
					name='author'
					placeholder='Enter your name'
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>
				<textarea
					name='text'
					placeholder='Enter your comment'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button type='submit'>Add your comment</button>
			</CommentForm>
		</Wrapper>
	);
}

export default Post;
