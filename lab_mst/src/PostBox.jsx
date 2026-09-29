import { useState } from "react";

export default function PostBox({ limit = 100 }) {
  // Controlled component: React state is the single source of truth
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);

  const length = text.length;
  const isEmpty = text.trim().length === 0;
  const isOver = length > limit;
  const isDisabled = isEmpty || isOver;

  const handlePost = () => {
    if (isDisabled) return;
    setPosts([text.trim(), ...posts]);
    setText("");
  };

  return (
    <section className="postbox">
      <h1>Post Box</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        rows={5}
        aria-label="Post content"
        className={isOver ? "invalid" : ""}
      />

      <div className="meta">
        <span className={`counter ${isOver ? "over" : ""}`}>
          {length} / {limit}
        </span>
        {isOver && <span className="error" role="alert">Limit exceeded</span>}
      </div>

      <button onClick={handlePost} disabled={isDisabled}>
        Post
      </button>

      {posts.length > 0 && (
        <ul className="posts">
          {posts.map((p, i) => (
            <li key={posts.length - i}>{p}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
