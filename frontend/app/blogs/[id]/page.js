"use client";

import { useEffect, useState } from "react";
import { use } from "react";

export default function BlogDetails({ params }) {

  const resolvedParams = use(params);

  const [blog, setBlog] = useState(null);

  useEffect(() => {

    fetch(`http://127.0.0.1:8000/blogs/${resolvedParams.id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((error) => console.log(error));

  }, [resolvedParams.id]);

  if (!blog) {

    return (

      <div className="min-h-screen bg-white flex items-center justify-center">

        <h1 className="text-3xl font-bold">
          Loading Article...
        </h1>

      </div>
    );
  }

  return (

    <main className="min-h-screen bg-[#F8F8F8] text-black">

      {/* HEADER */}

      <div className="bg-white border-b">

        <div className="max-w-5xl mx-auto px-6 py-10">

          <p className="text-blue-600 mb-4">
            {blog.category}
          </p>

          <h1 className="text-5xl font-serif leading-tight">
            {blog.title}
          </h1>

        </div>

      </div>

      {/* IMAGE */}

      <div className="max-w-5xl mx-auto px-6 py-10">

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-xl"
        />

      </div>

      {/* ARTICLE */}

      <article className="max-w-4xl mx-auto px-6 pb-20">

        <div className="bg-white p-10 rounded-xl border leading-9 text-[19px] whitespace-pre-line">

          {blog.content}

        </div>

      </article>

    </main>
  );
}