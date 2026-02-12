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
        <h2>Posts</h2>
        <div className="row">
          <Link href="/auth" className="link-btn">
            Auth Demo
          </Link>
          <Link href="/write" className="link-btn">
            Write
          </Link>
        </div>
      </div>

      {error ? <p className="error">{error}</p> : null}
      {loading ? <p>Loading...</p> : null}

      {!loading && posts.length > 0 ? (
        <ul className="list">
          {posts.map((post) => (
            <li key={post.id} className="list-item">
              <Link href={`/${post.id}`} className="title-link">
                {post.title}
              </Link>
              <small>#{post.id} | updated {new Date(post.updatedAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : null}

      {!loading && posts.length === 0 ? <p>No posts found.</p> : null}
    </section>
  );
}
