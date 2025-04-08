import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid black;
	border-radius: 1rem;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	padding: 2rem;
	margin-bottom: 2rem;

	.date {
		font-size: 1.3rem;
		font-weight: 300;
	}

	.content-preview {
		padding: 2rem;
		text-align: justify;
		font-size: 1.7rem;
	}

	button {
		padding: 1rem 3rem;
		font-size: 1.5rem;
	}
`;

function previewText(text, wordLimit) {
	const words = text.split(' ');
	if (words.length > wordLimit) {
		return words.slice(0, wordLimit - 1).join(' ') + '...';
	}

	return text;
}

function PostPreview({ id, title, content, date }) {
	return (
		<Wrapper>
			<div className='date'>{moment(date).format('MMMM Do YYYY')}</div>
			<h1>{title}</h1>
			<div
				className='content-preview'
				dangerouslySetInnerHTML={{ __html: previewText(content, 50) }}
			/>
			<Link to={`posts/${id}`}>
				<button>Read More</button>
			</Link>
		</Wrapper>
	);
}

PostPreview.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(Date),
};

export default PostPreview;
