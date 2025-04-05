import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormWrapper = styled.form`
	min-width: 600px;
	margin: 2rem auto;
	padding: 2rem;
	background-color: #f9f9f9;
	border-radius: 12px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	gap: 1rem;

	input,
	textarea {
		font-family: inherit;
	}

	h4 {
		color: red;
	}
`;

const Input = styled.input`
	padding: 0.75rem 1rem;
	font-size: 1.5rem;
	border: 1px solid #ccc;
	border-radius: 8px;
	outline: none;

	&:focus {
		border-color: darkgreen;
		box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
	}
`;

const Textarea = styled.textarea`
	padding: 0.75rem 1rem;
	font-size: 1.5rem;
	border: 1px solid #ccc;
	border-radius: 8px;
	outline: none;
	resize: vertical;
	min-height: 50rem;

	&:focus {
		border-color: darkgreen;
		box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
	}
`;

const SelectWrapper = styled.div`
	display: flex;
	font-size: 1.5rem;
	gap: 1rem;

	select {
		padding: 0 0.5rem;
	}
`;

const Button = styled.button`
	padding: 0.75rem 1.5rem;
	background-color: green;
	color: white;
	border: none;
	border-radius: 8px;
	font-size: 1.5rem;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: darkgreen;
	}
`;

function PostForm() {
	const [id, setId] = useState('');
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [published, setPublished] = useState('');
	const [editMode, setEditMode] = useState(false);
	const [error, setError] = useState('');

	const location = useLocation();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = editMode
			? `http://localhost:3000/posts/${id}`
			: `http://localhost:3000/posts/`;
		const httpVerb = editMode ? 'PUT' : 'POST';

		const res = await fetch(url, {
			method: httpVerb,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, content, published }),
		});

		const data = await res.json();
		if (!res.ok) {
			setError(data.message);
			return;
		}

		setId('');
		setTitle('');
		setContent('');
		setError('');
		navigate('/home');
	};

	useEffect(() => {
		if (location.state) {
			setId(location.state.id || '');
			setTitle(location.state.title || '');
			setContent(location.state.content || '');
			setPublished(location.state.published || '');
			setEditMode(true);
		}
	}, [location.state]);

	return (
		<FormWrapper onSubmit={handleSubmit}>
			{error && <h4>{error}</h4>}
			<Input
				type='text'
				name='title'
				id='title'
				placeholder='Post Title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Textarea
				name='content'
				id='content'
				placeholder='Post Content'
				value={content}
				onChange={(e) => setContent(e.target.value)}
			></Textarea>
			<SelectWrapper>
				<label htmlFor='published'>Publish post:</label>
				<select
					name='published'
					id='published'
					value={published ? 'true' : 'false'}
					onChange={(e) => setPublished(e.target.value)}
				>
					<option value='true'>Yes</option>
					<option value='false'>No</option>
				</select>
			</SelectWrapper>
			<Button type='submit'>
				{editMode ? 'Edit Post' : 'Create Post'}
			</Button>
		</FormWrapper>
	);
}

export default PostForm;
