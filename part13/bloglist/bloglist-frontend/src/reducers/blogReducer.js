import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setCreateNotification } from "./notificationReducer";

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		appendBlog(state, action) {
			state.push(action.payload);
		},
		setBlogs(state, action) {
			return action.payload;
		},
	},
});

export const { appendBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch(setBlogs(blogs));
	};
};

export const createNewBlog = (blog) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogService.create(blog);
			dispatch(appendBlog(newBlog));
			dispatch(
				setCreateNotification({
					content: `a new blog ${newBlog.title} created by ${newBlog.author}`,
					success: true,
				})
			);
		} catch {
			dispatch(
				setCreateNotification({
					content: "Creation of blog failed",
					success: false,
				})
			);
		}
	};
};

export const updateBlogLikes = (blog) => {
	return async (dispatch) => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1,
		};
		try {
			await blogService.updateLikes(blog.id, updatedBlog);
			const blogs = await blogService.getAll();
			dispatch(setBlogs(blogs));
			dispatch(
				setCreateNotification({
					content: `updated likes for ${updatedBlog.title}`,
					success: true,
				})
			);
		} catch {
			dispatch(
				setCreateNotification({
					content: "Updating likes failed",
					success: false,
				})
			);
		}
	};
};

export const createNewComment = (blog, comment) => {
	return async (dispatch) => {
		const updatedBlog = {
			...blog,
			comments: blog.comments.concat(comment),
		};
		try {
			await blogService.updateComments(blog.id, updatedBlog);
			const blogs = await blogService.getAll();
			dispatch(setBlogs(blogs));
			dispatch(
				setCreateNotification({
					content: "Creation of a new comment succeeded",
					success: true,
				})
			);
		} catch {
			dispatch(
				setCreateNotification({
					content: "Creation of a new comment failed",
					success: false,
				})
			);
		}
	};
};

export const deleteBlog = (blog) => {
	return async (dispatch) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			try {
				await blogService.del(blog.id);
				const blogs = await blogService.getAll();
				dispatch(setBlogs(blogs));
				dispatch(
					setCreateNotification({
						content: `Blog ${blog.title} by ${blog.author} removed`,
						success: true,
					})
				);
			} catch {
				dispatch(
					setCreateNotification({
						content: "Deleting a blog failed",
						success: false,
					})
				);
			}
		}
	};
};

export default blogSlice.reducer;
