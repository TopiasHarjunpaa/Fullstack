import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

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
		// try
		// blogFormRef.current.toggleVisibility();
		const newBlog = await blogService.create(blog);
		dispatch(appendBlog(newBlog));
		// dispatch(setCreateNotification(`a new blog ${newBlog.title} created by ${newBlog.author}`));
		// catch
		// dispatch(setCreateNotification("Creation of blog failed"));
	};
};

export const updateBlogLikes = (blog) => {
	return async (dispatch) => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1,
		};
		//try
		await blogService.update(blog.id, updatedBlog);
		const blogs = await blogService.getAll();
		dispatch(setBlogs(blogs));
		//dispatch(setCreateNotification(`updated likes for ${updatedBlog.title}`));
		//catch
		//dispatch(setCreateNotification("Updating likes failed"));
	};
};

export const deleteBlog = (blog) => {
	return async (dispatch) => {
		//if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
		//try
		await blogService.del(blog.id);
		const blogs = await blogService.getAll();
		dispatch(setBlogs(blogs));
		//dispatch(setCreateNotification(`Blog ${blog.title} by ${blog.author} removed`));
		//catch
		//dispatch(setCreateNotification("Deleting a blog failed"));
	};
};

export default blogSlice.reducer;
