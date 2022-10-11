import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("renders correctly", () => {
	let blog;
	beforeEach(() => {
		blog = {
			user: { id: "1" },
			title: "test-title",
			author: "test-author",
			url: "test.com",
			likes: 10,
			id: "123",
		};
	});

	test("title and author when view icon is not clicked", () => {
		render(<Blog blog={blog} info="1" userId="1" />);

		const titleElement = screen.getByText("test-title");
		const authorElement = screen.getByText("test-author");
		expect(titleElement).toBeDefined();
		expect(authorElement).toBeDefined();
	});

	test("url and likes are hidden when view icon is not clicked", () => {
		render(<Blog blog={blog} info="1" userId="1" />);

		const urlElement = screen.queryByText("test-url");
		const likesElement = screen.queryByText(10);
		expect(urlElement).toBeNull();
		expect(likesElement).toBeNull();
	});

	test("all content when view icon is clicked", async () => {
		const mockHandler = jest.fn();

		render(<Blog blog={blog} info="1" userId="1" setInfo={mockHandler} />);

		const user = userEvent.setup();
		const button = screen.getByText("view");

		await user.click(button);

		const titleElement = screen.getByText("test-title");
		const authorElement = screen.getByText("test-author");
		const urlElement = screen.queryByText("test-url");
		const likesElement = screen.queryByText(10);
		expect(titleElement).toBeDefined();
		expect(authorElement).toBeDefined();
		expect(urlElement).toBeDefined();
		expect(likesElement).toBeDefined();
		expect(mockHandler.mock.calls).toHaveLength(1);
	});

	test("update function works when likes are pressed", async () => {
		const mockHandler = jest.fn();

		render(<Blog blog={blog} info="123" userId="1" update={mockHandler} />);

		const user = userEvent.setup();
		const button = screen.getByText("like");

		await user.click(button);
		await user.click(button);

		expect(mockHandler.mock.calls).toHaveLength(2);
	});
});
