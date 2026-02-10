"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePostStore } from "@/stores/postStore";

export default function ListPage() {
  const { posts, loading, error, loadPosts } = usePostStore();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <section className="card">
      <div className="row between">
        <h2>게시글 목록</h2>
        <Link href="/write" className="link-btn">
          글쓰기
        </Link>
      </div>

      {error ? <p className="error">{error}</p> : null}
      {loading ? <p>불러오는 중...</p> : null}

      {!loading && posts.length > 0 ? (
        <ul className="list">
          {posts.map((post) => (
            <li key={post.id} className="list-item">
              <Link href={`/${post.id}`} className="title-link">
                {post.title}
              </Link>
              <small>#{post.id} | 수정 {new Date(post.updatedAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : null}

      {!loading && posts.length === 0 ? <p>게시글이 없습니다.</p> : null}
    </section>
  );
}
