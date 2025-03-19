import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid black;
`;

function PostPreview({ id, title, content, date }) {
	return (
		<Wrapper>
			<h4>{date}</h4>
			<h1>{title}</h1>
			<p>{content}</p>
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
