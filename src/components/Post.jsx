import { useParams } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';
import Bio from './Bio';
import moment from 'moment';
import styled from 'styled-components';

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
		</Wrapper>
	);
}

export default Post;
