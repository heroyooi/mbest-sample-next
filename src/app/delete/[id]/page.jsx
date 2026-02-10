"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePostStore } from "@/stores/postStore";

export default function DeletePage() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);
  const { currentPost, loading, error, loadPost, removePost } = usePostStore();

  useEffect(() => {
    loadPost(postId);
  }, [loadPost, postId]);

  const handleDelete = async () => {
    const removed = await removePost(postId);
    if (removed?.id) {
      router.push("/");
    }
  };

  return (
    <section className="card">
      <h2>삭제 확인</h2>
      {error ? <p className="error">{error}</p> : null}
      {loading ? <p>불러오는 중...</p> : null}

      {!loading && currentPost ? (
        <>
          <p>
            <strong>{currentPost.title}</strong> 게시글을 삭제하시겠습니까?
          </p>
          <div className="row">
            <button type="button" className="danger" disabled={loading} onClick={handleDelete}>
              삭제 실행
            </button>
            <Link href={`/${currentPost.id}`} className="link-btn">
              취소
            </Link>
          </div>
        </>
      ) : null}
    </section>
  );
}
