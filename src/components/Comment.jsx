import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin: 1rem 0;

	.author {
		font-size: 2.2rem;
	}

	p {
		font-size: 1.2rem;
		font-style: italic;
	}

	.text {
		font-size: 1.6rem;
		font-weight: normal;
	}
`;

function Comment({ author, text, date }) {
	return (
		<Wrapper>
			<h2 className='author'>{author}</h2>
			<p> {moment(date).format('MMMM Do YYYY')}</p>
			<h2 className='text'>{text}</h2>
		</Wrapper>
	);
}

Comment.propTypes = {
	author: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(Date),
};

export default Comment;
