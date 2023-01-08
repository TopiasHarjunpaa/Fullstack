import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import BlogList from "../components/BlogList";

const SingleUserPage = () => {
	const id = useParams().id;
	const users = useSelector((state) => state.users);
	const user = users.find((u) => u.id === id);
	if (!user) {
		return null;
	}

	return (
		<div>
			<h3>{`${user.name}'s added blogs`}</h3>
			<BlogList blogs={user.blogs} path={"../../"} />
		</div>
	);
};

export default SingleUserPage;
