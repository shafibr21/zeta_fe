import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

const fetchPostById = async (id: string | number): Promise<Post> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
};

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePost = (id?: string | number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["post", id],
    enabled: id != null && String(id).trim().length > 0,
    queryFn: async () => {
      // 1) Try to get from posts list cache
      const posts = queryClient.getQueryData<Post[]>(["posts"]);
      const cached = posts?.find(p => String(p.id) === String(id));
      if (cached) return cached;

      // 2) Fall back to fetching single post
      return fetchPostById(id as string | number);
    },
    staleTime: 5 * 60 * 1000,
  });
};
