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

const postPromise = (postId) => fetch(`http://localhost:3000/posts/${postId}`);
const commentsPromise = (postId) =>
	fetch(`http://localhost:3000/posts/${postId}/comments`);

function Post() {
	const { postId } = useParams();
	const [post, setPost] = useState();
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const postFetch = async () => {
			const postData = await (await postPromise(postId)).json();
			setPost(postData);
			const commentsData = await (await commentsPromise(postId)).json();
			setComments(commentsData);
		};

		postFetch();
	}, [postId]);

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
		</Wrapper>
	);
}

export default Post;
