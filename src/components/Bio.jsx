import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	h2,
	p {
		font-size: 1.5rem;
	}
`;

function Bio() {
	return (
		<Container>
			<h2>About Me</h2>
			<p>
				CS Enthusiast, AI Researcher and Programming lover at heart.
				Currently working as a Software Developer at Vermeg and
				finishing my masters thesis - Computer Science Department
				University of Monastir, Tunisia.
			</p>
		</Container>
	);
}

export default Bio;
