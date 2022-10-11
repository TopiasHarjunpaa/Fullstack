import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = ({ userId }) => {
	const blogs = useSelector((state) => state.blogs);
	const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

	return (
		<div>
			{sortedBlogs.map((blog) => (
				<Blog key={blog.id} blog={blog} userId={userId} />
			))}
		</div>
	);
};

export default BlogList;
