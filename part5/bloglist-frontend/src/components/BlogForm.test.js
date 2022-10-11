import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("creating a new blog calls callback function with right attributes", async () => {
	const user = userEvent.setup();
	const mockHandler = jest.fn();

	const { container } = render(<BlogForm createBlog={mockHandler} />);

	const titleInput = container.querySelector("#title");
	const authorInput = container.querySelector("#author");
	const urlInput = container.querySelector("#url");
	const createButton = screen.getByText("create");

	await user.type(titleInput, "test-title");
	await user.type(authorInput, "test-author");
	await user.type(urlInput, "test-url");
	await user.click(createButton);

	expect(mockHandler.mock.calls).toHaveLength(1);
	expect(mockHandler.mock.calls[0][0].title).toBe("test-title");
	expect(mockHandler.mock.calls[0][0].author).toBe("test-author");
	expect(mockHandler.mock.calls[0][0].url).toBe("test-url");
});
