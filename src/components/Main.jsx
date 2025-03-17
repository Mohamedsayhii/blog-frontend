import { useEffect, useState } from 'react';
import Bio from './Bio';

function Main() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/posts/')
			.then((res) => res.json())
			.then((json) => {
				setPosts(json);
				console.log(json);
			});
	}, []);

	return (
		<>
			<Bio />
			<div>Posts go here</div>
		</>
	);
}

export default Main;
