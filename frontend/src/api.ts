const API_BASE_URL = "http://localhost:5000/api/v1/user";

export interface Tag {
  _id: string;
  title: string;
}

export interface Content {
  _id: string;
  title: string;
  link: string;
  type: "image" | "video" | "article" | "tweet" | "document" | "link";
  tags: Tag[];
  createdAt: string;
}

interface AuthResponse {
  token: string;
}

async function request<T>(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { token } : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data as T;
}

export function signupUser(input: {
  email: string;
  username: string;
  password: string;
}) {
  return request<{ message: string }>("/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function loginUser(input: { email: string; password: string }) {
  return request<AuthResponse>("/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function getContent() {
  return request<{ content: Content[] }>("/content");
}

export function createContent(input: {
  title: string;
  type: string;
  link: string;
  tags: string[];
}) {
  return request<{ content: Content }>("/content", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function deleteContent(contentId: string) {
  return request<{ message: string }>(`/content/${contentId}`, {
    method: "DELETE",
  });
}

export function shareBrain() {
  return request<{ shareUrl: string }>("/brain/share", {
    method: "POST",
  });
}

export function getSharedBrain(hash: string) {
  return request<{ content: Content[] }>(`/brain/${hash}`);
}
