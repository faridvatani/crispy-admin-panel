import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UsersTable } from "@/components/features";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: string;
}

// Helper function to generate mock users
const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: `User${i + 1}`,
    email: `user${i + 1}@example.com`,
    username: `user${i + 1}`,
    createdAt: new Date().toISOString(),
  }));
};

const mockUsers = generateMockUsers(2);

const renderUsersTable = (props = {}) => {
  const defaultProps = {
    users: mockUsers,
    isLoading: false,
    totalPages: 2,
    currentPage: 1,
    totalItems: 10,
    onPageChange: jest.fn(),
  };
  return render(<UsersTable {...defaultProps} {...props} />);
};

describe("UsersContent", () => {
  it("renders UsersTable component", () => {
    renderUsersTable();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders table headings", () => {
    renderUsersTable();
    ["ID", "Name", "Email", "Username", "Date"].forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  it("renders user rows", () => {
    renderUsersTable();
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  it("renders pagination correctly", () => {
    renderUsersTable({ totalPages: 3, currentPage: 2, totalItems: 2 });
    ["previous", "1", "2", "3", "next"].forEach((link) => {
      expect(
        screen.getByRole("link", { name: new RegExp(link, "i") }),
      ).toBeInTheDocument();
    });
  });

  it("renders loading state", () => {
    renderUsersTable({ isLoading: true });
    expect(screen.getAllByRole("row").length).toBe(8);
  });
});
