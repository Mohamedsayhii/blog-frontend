import App from './App';
import BlogOverview from './components/BlogOverview';
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
		path: 'login',
		element: <Login />,
	},
	{
		path: 'home',
		element: <BlogOverview/>
	}
];

export default routes;
