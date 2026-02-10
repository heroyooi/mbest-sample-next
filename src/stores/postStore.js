import { create } from "zustand";
import { queryClient } from "@/lib/queryClient";
import { postQueryKeys } from "@/api/queryKeys";
import {
  createPostApi,
  deletePostApi,
  fetchPostApi,
  fetchPostsApi,
  updatePostApi
} from "@/api/postApi";

const getRequestErrorMessage = (requestError) => {
  return requestError?.message || "요청 중 오류가 발생했습니다.";
};

export const usePostStore = create((set, get) => {
  const runRequest = async (requester) => {
    set({ loading: true, error: "" });
    try {
      return await requester();
    } catch (requestError) {
      set({ error: getRequestErrorMessage(requestError) });
      return null;
    } finally {
      set({ loading: false });
    }
  };

  return {
    posts: [],
    currentPost: null,
    loading: false,
    error: "",

    loadPosts: async () => {
      const payload = await runRequest(() =>
        queryClient.fetchQuery({
          queryKey: postQueryKeys.all,
          queryFn: fetchPostsApi
        })
      );
      if (payload?.success) {
        set({ posts: payload.data });
        return payload.data;
      }
      return null;
    },

    loadPost: async (id) => {
      const normalizedId = Number(id);
      const payload = await runRequest(() =>
        queryClient.fetchQuery({
          queryKey: postQueryKeys.detail(normalizedId),
          queryFn: () => fetchPostApi(normalizedId)
        })
      );
      if (payload?.success) {
        set({ currentPost: payload.data });
        return payload.data;
      }
      set({ currentPost: null });
      return null;
    },

    createPost: async (input) => {
      const payload = await runRequest(() => createPostApi(input));
      if (payload?.success) {
        const created = payload.data;
        queryClient.setQueryData(postQueryKeys.detail(created.id), payload);
        const prevList = queryClient.getQueryData(postQueryKeys.all);
        if (prevList?.success && Array.isArray(prevList.data)) {
          queryClient.setQueryData(postQueryKeys.all, {
            ...prevList,
            data: [created, ...prevList.data]
          });
          set({ posts: [created, ...get().posts] });
        } else {
          await queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
        }
        return created;
      }
      return null;
    },

    updatePost: async (id, input) => {
      const normalizedId = Number(id);
      const payload = await runRequest(() => updatePostApi(normalizedId, input));
      if (payload?.success) {
        const updated = payload.data;
        set((state) => ({
          currentPost: updated,
          posts: state.posts.map((post) => (post.id === updated.id ? updated : post))
        }));
        queryClient.setQueryData(postQueryKeys.detail(updated.id), payload);
        const prevList = queryClient.getQueryData(postQueryKeys.all);
        if (prevList?.success && Array.isArray(prevList.data)) {
          queryClient.setQueryData(postQueryKeys.all, {
            ...prevList,
            data: prevList.data.map((post) => (post.id === updated.id ? updated : post))
          });
        }
        return updated;
      }
      return null;
    },

    removePost: async (id) => {
      const normalizedId = Number(id);
      const payload = await runRequest(() => deletePostApi(normalizedId));
      if (payload?.success) {
        set((state) => ({
          currentPost: state.currentPost?.id === normalizedId ? null : state.currentPost,
          posts: state.posts.filter((post) => post.id !== normalizedId)
        }));
        queryClient.removeQueries({ queryKey: postQueryKeys.detail(normalizedId) });
        const prevList = queryClient.getQueryData(postQueryKeys.all);
        if (prevList?.success && Array.isArray(prevList.data)) {
          queryClient.setQueryData(postQueryKeys.all, {
            ...prevList,
            data: prevList.data.filter((post) => post.id !== normalizedId)
          });
        } else {
          await queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
        }
        return payload.data;
      }
      return null;
    }
  };
});
