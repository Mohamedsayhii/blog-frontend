import App from './App';
import Login from './components/Login';
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
	{
		path: '/login',
		element: <Login />,
	},
];

export default routes;
