import { useState, useEffect } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  avatar?: string;
  createdAt: string;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "active",
    createdAt: "2024-02-20T14:15:00Z",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Moderator",
    status: "inactive",
    createdAt: "2024-03-10T09:45:00Z",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "User",
    status: "active",
    createdAt: "2024-03-25T16:20:00Z",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2024-04-05T11:10:00Z",
  },
];

export interface UseUsersResult {
  data: User[] | undefined;
  isLoading: boolean;
  error: string | null;
}

export const useUsers = (): UseUsersResult => {
  const [data, setData] = useState<User[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        setData(mockUsers);
        setError(null);
      } catch (err) {
        setError("Failed to fetch users");
        setData(undefined);
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading, error };
};
