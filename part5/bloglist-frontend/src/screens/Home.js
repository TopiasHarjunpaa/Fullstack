import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

const Home = ({ user }) => {
	return (
		<div>
			<BlogForm />
			<BlogList userId={user.id} />
		</div>
	);
};

export default Home;
