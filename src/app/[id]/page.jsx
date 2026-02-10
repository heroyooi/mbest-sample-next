"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { usePostStore } from "@/stores/postStore";

export default function DetailPage() {
  const params = useParams();
  const postId = Number(params.id);
  const { currentPost, loading, error, loadPost } = usePostStore();

  useEffect(() => {
    loadPost(postId);
  }, [loadPost, postId]);

  return (
    <section className="card">
      {error ? <p className="error">{error}</p> : null}
      {loading ? <p>불러오는 중...</p> : null}

      {!loading && currentPost ? (
        <>
          <h2>{currentPost.title}</h2>
          <p className="meta">
            #{currentPost.id} | 생성 {new Date(currentPost.createdAt).toLocaleString()} | 수정{" "}
            {new Date(currentPost.updatedAt).toLocaleString()}
          </p>
          <p className="content">{currentPost.content}</p>
          <div className="row">
            <Link href={`/edit/${currentPost.id}`} className="link-btn">
              수정
            </Link>
            <Link href={`/delete/${currentPost.id}`} className="link-btn danger">
              삭제
            </Link>
          </div>
        </>
      ) : null}
    </section>
  );
}
