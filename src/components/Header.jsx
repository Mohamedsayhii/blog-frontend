import styled from 'styled-components';
import personalPhoto from '/personal-photo.jpg';

const Container = styled.div`
	img {
		width: 15rem;
		height: 15rem;
		border-radius: 10rem;
		margin-bottom: -0.5rem;
	}
`;

function Header() {
	return (
		<Container>
			<img src={personalPhoto} alt='mohamed sayhi personal image' />
			<h1>Mohamed Sayhi</h1>
		</Container>
	);
}

export default Header;
