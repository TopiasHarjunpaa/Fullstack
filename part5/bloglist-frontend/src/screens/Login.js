import LoginForm from "../components/LoginForm";

const Home = ({ user }) => {
	return (
		<div>
			<h3>Login page</h3>
			<LoginForm />
		</div>
	);
};

export default Home;
