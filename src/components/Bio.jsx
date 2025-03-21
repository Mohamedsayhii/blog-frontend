import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin: 1.5rem 0;

	h2,
	p {
		font-size: 1.5rem;
	}
`;

function Bio({ title }) {
	const header = title === true ? 'About Me' : 'About Mohamed Sayhi';

	return (
		<Container>
			<h2>{header}</h2>
			<p>
				CS Enthusiast, AI Researcher and Programming lover at heart.
				Currently working as a AI Developer at Vermeg and finishing my
				masters thesis - Computer Science Department University of
				Monastir, Tunisia.
			</p>
		</Container>
	);
}

Bio.propTypes = {
	title: PropTypes.bool.isRequired,
};

export default Bio;
