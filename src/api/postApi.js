import { request } from "@/api/httpClient";

export const fetchPostsApi = () => {
  return request("/api/posts");
};

export const fetchPostApi = (id) => {
  return request(`/api/posts/${id}`);
};

export const createPostApi = (payload) => {
  return request("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
};

export const updatePostApi = (id, payload) => {
  return request(`/api/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
};

export const deletePostApi = (id) => {
  return request(`/api/posts/${id}`, {
    method: "DELETE"
  });
};
