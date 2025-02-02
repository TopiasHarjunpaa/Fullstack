const User = ({ user }) => {
	return (
		<div>
			<h2>{user.name}</h2>
			<h3>Added blogs</h3>
			{user.blogs.map((blog) => (
				<p key={blog.id}>{blog.title}</p>
			))}
		</div>
	);
};

export default User;
