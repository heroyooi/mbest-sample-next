"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import PostForm from "@/components/PostForm";
import { usePostStore } from "@/stores/postStore";

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);
  const { currentPost, loading, error, loadPost, updatePost } = usePostStore();

  const initialValues = useMemo(
    () => ({
      title: currentPost?.title || "",
      content: currentPost?.content || ""
    }),
    [currentPost]
  );

  useEffect(() => {
    loadPost(postId);
  }, [loadPost, postId]);

  const handleSubmit = async (form) => {
    const updated = await updatePost(postId, form);
    if (updated?.id) {
      router.push(`/${updated.id}`);
    }
  };

  return (
    <div>
      <h2>수정</h2>
      {error ? <p className="error">{error}</p> : null}
      <PostForm
        initialValues={initialValues}
        loading={loading}
        submitLabel="수정 완료"
        onSubmit={handleSubmit}
      />
      {!loading && !currentPost ? <p className="error">게시글을 찾을 수 없습니다.</p> : null}
    </div>
  );
}
