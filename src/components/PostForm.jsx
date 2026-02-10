"use client";

import { useEffect, useState } from "react";

export default function PostForm({ initialValues, loading, submitLabel = "저장", onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    setForm({
      title: initialValues?.title || "",
      content: initialValues?.content || ""
    });
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title: form.title.trim(),
      content: form.content.trim()
    });
  };

  return (
    <section className="card">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">제목</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요."
          />
        </div>

        <div className="field">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            value={form.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요."
          />
        </div>

        <div className="row">
          <button type="submit" disabled={loading}>
            {submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
