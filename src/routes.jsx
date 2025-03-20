import App from './App';
import Post from './components/Post';

const routes = [
	{
		path: '/',
		element: <App />,
	},
	{
		path: 'posts/:postId',
		element: <Post />,
	},
];

export default routes;
