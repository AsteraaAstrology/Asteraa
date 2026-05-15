"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogsPage() {

  const [blogs, setBlogs] = useState([]);

 useEffect(() => {

  fetch("https://asteraa.onrender.com/blogs")
    .then((res) => res.json())
    .then((data) => {

      setBlogs(data.blogs || []);

    })
    .catch((error) => {

      console.log(error);

      setBlogs([]);

    });

}, []);

  return (

    <main className="min-h-screen bg-[#F5F5F5] text-black">

      {/* TOP BAR */}

      <div className="border-b bg-white">

        <div className="max-w-6xl mx-auto px-6 py-6">

          <h1 className="text-5xl font-serif">
            Asteraa Blogs
          </h1>

          <p className="text-gray-600 mt-2">
            Astrology Knowledge • Zodiac Insights • Spiritual Guidance
          </p>

        </div>

      </div>

      {/* BLOGS */}

      <div className="max-w-5xl mx-auto px-6 py-10">

        {blogs.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold">
              No Blogs Found
            </h2>

          </div>

        ) : (

          <div className="space-y-12">

            {blogs.map((blog) => (

              <article
                key={blog.id}
                className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm"
              >

                {/* IMAGE */}

                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-[300px] object-cover"
                />

                {/* CONTENT */}

                <div className="p-8">

                  <p className="text-blue-600 text-sm mb-3">
                    {blog.category}
                  </p>

                  <h2 className="text-4xl font-serif mb-5">
                    {blog.title}
                  </h2>

                  <p className="text-gray-700 leading-8 text-lg">

                    {blog.content.slice(0, 300)}...

                  </p>

                  <Link
                    href={`/blogs/${blog.id}`}
                    className="inline-block mt-8 text-blue-600 text-lg font-semibold hover:underline"
                  >
                    Read Full Article →
                  </Link>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}