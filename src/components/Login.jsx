import { useState } from 'react';
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

	h3 {
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
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();

		const response = await fetch(
			'https://definite-etheline-ms-personal-73ef4f8e.koyeb.app/auth/login',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			}
		);

		const data = await response.json();

		if (!response.ok) {
			setError(data.message);
			return;
		}

		window.location.href = '/home'; // Redirect to home
	};

	return (
		<Wrapper>
			<div className='slogan'>
				<h1>Your Personal Blog.</h1>
				<h2>Share your thoughts online.</h2>
			</div>
			<LoginForm onSubmit={handleLogin}>
				{error && <h3>{error}</h3>}
				<div className='form-field'>
					<label>Email</label>
					<input
						type='text'
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className='form-field'>
					<label>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type='submit'>Log In</button>
			</LoginForm>
		</Wrapper>
	);
}

export default Login;
