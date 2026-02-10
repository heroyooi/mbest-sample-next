"use client";

import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import { usePostStore } from "@/stores/postStore";

export default function WritePage() {
  const router = useRouter();
  const { loading, error, createPost } = usePostStore();

  const handleSubmit = async (form) => {
    const created = await createPost(form);
    if (created?.id) {
      router.push(`/${created.id}`);
    }
  };

  return (
    <div>
      <h2>글쓰기</h2>
      {error ? <p className="error">{error}</p> : null}
      <PostForm loading={loading} submitLabel="작성" onSubmit={handleSubmit} />
    </div>
  );
}
