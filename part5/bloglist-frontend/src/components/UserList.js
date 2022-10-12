import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
	const users = useSelector((state) => state.users);
	return (
		<div>
			{users.map((user) => (
				<li key={user.id}>
					<Link to={user.id}>{user.name}</Link>
					<p style={{ display: "inline", paddingLeft: 10 }}>
						{user.blogs.length}
					</p>
				</li>
			))}
		</div>
	);
};

export default UserList;
