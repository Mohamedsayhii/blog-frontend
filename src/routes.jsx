import App from './App';
import Post from './components/Post';

const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: ':postId',
				element: <Post />,
			},
		],
	},
];

export default routes;
