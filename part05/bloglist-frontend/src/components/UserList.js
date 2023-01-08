import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserList = () => {
	const users = useSelector((state) => state.users);

	return (
		<div>
			<Table striped>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Username</th>
						<th scope="col">Blogs</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={user.id}>
							<th scope="row">{index + 1}</th>
							<td>
								<Link to={user.id}>{user.name}</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default UserList;
