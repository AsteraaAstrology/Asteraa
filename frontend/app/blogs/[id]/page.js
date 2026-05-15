"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogDetails() {

  const params = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {

    fetch(`https://asteraa.onrender.com/blogs/${params.id}`)
      .then((res) => res.json())
      .then((data) => {

        // BACKEND RETURNS:
        // { success: true, blog: {...} }

        if (data.success) {

          setBlog(data.blog);

        } else {

          setBlog(null);
        }

      })
      .catch((error) => {

        console.log(error);

      });

  }, [params.id]);

  // LOADING

  if (!blog) {

    return (

      <div className="min-h-screen bg-[#070B16] flex items-center justify-center text-white">

        <h1 className="text-3xl font-bold">
          Loading Article...
        </h1>

      </div>
    );
  }

  return (

    <main className="min-h-screen bg-[#070B16] text-white">

      {/* HEADER */}

      <div className="border-b border-white/10">

        <div className="max-w-5xl mx-auto px-6 py-14">

          <p className="text-yellow-400 mb-5 text-lg">
            {blog.category}
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {blog.title}
          </h1>

        </div>

      </div>

      {/* IMAGE */}

      <div className="max-w-5xl mx-auto px-6 py-10">

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[500px] object-cover rounded-[32px] border border-white/10"
        />

      </div>

      {/* ARTICLE */}

      <article className="max-w-4xl mx-auto px-6 pb-24">

        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[32px]">

          <p className="text-gray-300 leading-[2.2] text-[18px] whitespace-pre-line">

            {blog.content}

          </p>

        </div>

      </article>

    </main>
  );
}