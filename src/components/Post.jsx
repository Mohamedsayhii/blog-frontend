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

		.content {
			text-align: left;
			font-size: 2rem;
		}
	}
`;

const Comments = styled.div`
	text-align: left;
`;

const CommentForm = styled.form`
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	h4 {
		color: red;
	}

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
		background: darkgreen;
	}
`;

function Post() {
	const { postId } = useParams();
	const [post, setPost] = useState();
	const [comments, setComments] = useState([]);
	const [author, setAuthor] = useState('');
	const [text, setText] = useState('');
	const [error, setError] = useState();

	useEffect(() => {
		Promise.all([
			fetch(
				`https://definite-etheline-ms-personal-73ef4f8e.koyeb.app/posts/${postId}`
			).then((res) => res.json()),
			fetch(
				`https://definite-etheline-ms-personal-73ef4f8e.koyeb.app/comments/${postId}/`
			).then((res) => res.json()),
		]).then(([postData, commentsData]) => {
			setPost(postData);
			setComments(commentsData);
		});
	}, [postId]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch(
			`https://definite-etheline-ms-personal-73ef4f8e.koyeb.app/comments/${postId}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ author, text }),
			}
		);

		const data = await res.json();
		if (!res.ok) {
			setError(data.message.split(','));
			return;
		}

		setComments([...comments, data]);
		setAuthor('');
		setText('');
		setError();

		location.reload();
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
				<div
					className='content'
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
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
				{error &&
					// eslint-disable-next-line react/jsx-key
					error.map((e) => <h4>{e}</h4>)}
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
