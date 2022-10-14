import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogList = ({ blogs, path }) => {
	const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

	return (
		<div>
			<Table striped>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Title</th>
						<th scope="col">Author</th>
						<th scope="col">Url</th>
						<th scope="col">Likes</th>
						<th scope="col">Comments</th>
					</tr>
				</thead>
				<tbody>
					{sortedBlogs.map((blog, index) => (
						<tr key={blog.id}>
							<th scope="row">{index + 1}</th>
							<td>
								<Link to={`${path}/blogs/${blog.id}`}>{blog.title}</Link>
							</td>
							<td>{blog.author}</td>
							<td>{blog.url}</td>
							<td>{blog.likes}</td>
							<td>{blog.comments.length}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default BlogList;
