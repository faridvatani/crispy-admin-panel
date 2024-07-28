// __tests__/Products.test.tsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Products from "./page";

describe("Products Component", () => {
  beforeEach(() => {
    render(<Products />);
  });

  it("should render without crashing", () => {
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("should render the main heading with correct text", () => {
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent("Products");
  });

  it("should render the placeholder heading with correct text", () => {
    const placeholderHeading = screen.getByRole("heading", { level: 3 });
    expect(placeholderHeading).toBeInTheDocument();
    expect(placeholderHeading).toHaveTextContent("You have no products");
  });

  it("should render the description text", () => {
    const description = screen.getByText(
      "You can start selling as soon as you add a product.",
    );
    expect(description).toBeInTheDocument();
  });

  it("should render the 'Add Product' button", () => {
    const addButton = screen.getByRole("button", { name: /add product/i });
    expect(addButton).toBeInTheDocument();
  });

  it("should handle 'Add Product' button click", () => {
    const addButton = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(addButton);
    // Add assertions for what should happen after the button is clicked
    // For example, you might check if a modal opens or a form appears
    // expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
