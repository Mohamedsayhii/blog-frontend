import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const FormWrapper = styled.div`
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

const Button = styled.button`
	padding: 0.75rem 1.5rem;
	background-color: green;
	color: white;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: darkgreen;
	}
`;

function PostForm() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [editMode, setEditMode] = useState(false);

	const location = useLocation();

	useEffect(() => {
		if (location.state) {
			setTitle(location.state.title || '');
			setContent(location.state.content || '');
			setEditMode(true);
		}
	}, [location.state]);

	return (
		<FormWrapper>
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
			<Button>{editMode ? 'Edit Post' : 'Create Post'}</Button>
		</FormWrapper>
	);
}

export default PostForm;
