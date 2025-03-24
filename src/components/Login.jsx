import styled from 'styled-components';

const Wrapper = styled.div`
	height: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.slogan {
		padding: 1rem;
		text-align: center;
	}

	.slogan h1 {
		color: green;
	}

	.slogan h2 {
		font-style: italic;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		font-weight: 500;
		gap: 1rem;
	}

	.form-field label {
		font-size: 1.5rem;
	}
`;

const LoginForm = styled.form`
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	h4 {
		color: red;
	}

	input {
		font-family: inherit;
		width: 100%;
		padding: 0.8rem;
		font-size: 1.6rem;
		border: 1px solid #ccc;
		border-radius: 8px;
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

function Login() {
	return (
		<Wrapper>
			<div className='slogan'>
				<h1>Your Personal Blog.</h1>
				<h2>Share your thoughts online.</h2>
			</div>
			{/* {errors} */}
			<LoginForm action='/' method='post'>
				<div className='form-field'>
					<label htmlFor='username'>Username</label>
					<input type='text' name='username' id='username' required />
				</div>
				<div className='form-field'>
					<label htmlFor='password'>Password</label>
					<input type='password' name='password' id='password' />
				</div>
				<button type='submit'>Log In</button>
			</LoginForm>
		</Wrapper>
	);
}

export default Login;
