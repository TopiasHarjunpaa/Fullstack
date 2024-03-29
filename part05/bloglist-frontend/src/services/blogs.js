import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = async (newObject) => {
	const config = { headers: { Authorization: token } };
	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const updateLikes = async (id, newObject) => {
	const response = await axios.put(`${baseUrl}/${id}`, newObject);
	return response.data;
};

const updateComments = async (id, newObject) => {
	const response = await axios.put(`${baseUrl}/${id}/comments`, newObject);
	return response.data;
};

const del = async (id) => {
	const config = { headers: { Authorization: token } };
	const response = await axios.delete(`${baseUrl}/${id}`, config);
	return response.data;
};

const exportedObject = {
	getAll,
	create,
	setToken,
	updateLikes,
	updateComments,
	del,
};
export default exportedObject;
