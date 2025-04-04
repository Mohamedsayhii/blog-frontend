import App from './App';
import BlogOverview from './components/BlogOverview';
import Login from './components/Login';
import Post from './components/Post';
import PostForm from './components/PostForm';

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
		element: <BlogOverview />,
	},
	{
		path: 'home/postform',
		element: <PostForm />,
	},
];

export default routes;
