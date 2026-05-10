"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {

  // =====================================================
  // API URL
  // =====================================================

  const API_URL = "http://127.0.0.1:8000";

  // =====================================================
  // HOROSCOPE STATES
  // =====================================================

  const [zodiac, setZodiac] = useState("");
  const [horoscope, setHoroscope] = useState("");

  const [loading, setLoading] = useState(false);

  const [allHoroscopes, setAllHoroscopes] = useState([]);

  // =====================================================
  // BLOG STATES
  // =====================================================

  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState(null);

  const [blogLoading, setBlogLoading] = useState(false);

  const [allBlogs, setAllBlogs] = useState([]);

  // =====================================================
  // ZODIAC LIST
  // =====================================================

  const zodiacSigns = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  // =====================================================
  // FETCH BLOGS
  // =====================================================

  const fetchBlogs = async () => {

    try {

      const response = await fetch(
        `${API_URL}/blogs`
      );

      const data = await response.json();

      // SUPPORT BOTH ARRAY + OBJECT RESPONSE

      if (Array.isArray(data)) {

        setAllBlogs(data);

      } else if (Array.isArray(data.blogs)) {

        setAllBlogs(data.blogs);

      } else {

        setAllBlogs([]);
      }

    } catch (error) {

      console.log(error);

      setAllBlogs([]);
    }
  };

  // =====================================================
  // FETCH HOROSCOPES
  // =====================================================

  const fetchHoroscopes = async () => {

    try {

      const response = await fetch(
        `${API_URL}/horoscopes`
      );

      const data = await response.json();

      // SUPPORT BOTH ARRAY + OBJECT RESPONSE

      if (Array.isArray(data)) {

        setAllHoroscopes(data);

      } else if (Array.isArray(data.horoscopes)) {

        setAllHoroscopes(data.horoscopes);

      } else {

        setAllHoroscopes([]);
      }

    } catch (error) {

      console.log(error);

      setAllHoroscopes([]);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {

    fetchBlogs();
    fetchHoroscopes();

  }, []);

  // =====================================================
  // PUBLISH HOROSCOPE
  // =====================================================

  const publishHoroscope = async () => {

    if (!zodiac || !horoscope) {

      alert("Please fill all fields");

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/add-horoscope`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            zodiac,
            horoscope,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      setZodiac("");
      setHoroscope("");

      fetchHoroscopes();

    } catch (error) {

      console.log(error);

      alert("Failed to publish horoscope");

    } finally {

      setLoading(false);
    }
  };

  // =====================================================
  // DELETE HOROSCOPE
  // =====================================================

  const deleteHoroscope = async (id) => {

    const confirmDelete = confirm(
      "Delete this horoscope?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        `${API_URL}/delete-horoscope/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchHoroscopes();

    } catch (error) {

      console.log(error);

      alert("Failed to delete horoscope");
    }
  };

  // =====================================================
  // PUBLISH BLOG
  // =====================================================

  const publishBlog = async () => {

    if (
      !blogTitle ||
      !blogCategory ||
      !blogContent ||
      !blogImage
    ) {

      alert("Please fill all blog fields");

      return;
    }

    try {

      setBlogLoading(true);

      const formData = new FormData();

      formData.append("title", blogTitle);
      formData.append("category", blogCategory);
      formData.append("content", blogContent);
      formData.append("image", blogImage);

      const response = await fetch(
        `${API_URL}/add-blog`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      alert(data.message);

      // RESET FORM

      setBlogTitle("");
      setBlogCategory("");
      setBlogContent("");
      setBlogImage(null);

      fetchBlogs();

    } catch (error) {

      console.log(error);

      alert("Failed to publish blog");

    } finally {

      setBlogLoading(false);
    }
  };

  // =====================================================
  // DELETE BLOG
  // =====================================================

  const deleteBlog = async (id) => {

    const confirmDelete = confirm(
      "Delete this blog?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        `${API_URL}/delete-blog/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchBlogs();

    } catch (error) {

      console.log(error);

      alert("Failed to delete blog");
    }
  };

  return (

    <main className="min-h-screen bg-[#030712] text-white px-4 md:px-6 py-16">

      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="text-center mb-16">

          <p className="text-yellow-400 tracking-[0.3em] text-sm mb-4">
            ASTERAA ADMIN PANEL
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Admin Dashboard
          </h1>

          <p className="text-gray-400 text-lg">
            Manage Horoscopes & Blogs
          </p>

        </div>

        {/* =====================================================
            TOP GRID
        ===================================================== */}

        <div className="grid lg:grid-cols-2 gap-10">

          {/* =====================================================
              HOROSCOPE PANEL
          ===================================================== */}

          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-xl">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">
              Publish Horoscope
            </h2>

            <div className="space-y-5">

              <select
                value={zodiac}
                onChange={(e) => setZodiac(e.target.value)}
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              >

                <option value="">
                  Select Zodiac
                </option>

                {
                  zodiacSigns.map((item, index) => (

                    <option key={index}>
                      {item}
                    </option>

                  ))
                }

              </select>

              <textarea
                rows="10"
                placeholder="Write Daily Horoscope"
                value={horoscope}
                onChange={(e) => setHoroscope(e.target.value)}
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none"
              />

              <button
                onClick={publishHoroscope}
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-yellow-400 text-black text-lg font-bold hover:scale-[1.01] transition"
              >

                {
                  loading
                    ? "Publishing..."
                    : "Publish Horoscope"
                }

              </button>

            </div>

          </div>

          {/* =====================================================
              BLOG PANEL
          ===================================================== */}

          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-xl">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">
              Publish Blog
            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Blog Title"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Blog Category"
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

              <textarea
                rows="8"
                placeholder="Write Blog Content"
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none"
              />

              {/* IMAGE UPLOAD */}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBlogImage(e.target.files[0])}
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4
                file:mr-4
                file:px-4
                file:py-2
                file:border-0
                file:rounded-xl
                file:bg-yellow-400
                file:text-black
                file:font-semibold"
              />

              <button
                onClick={publishBlog}
                disabled={blogLoading}
                className="w-full py-4 rounded-2xl bg-yellow-400 text-black text-lg font-bold hover:scale-[1.01] transition"
              >

                {
                  blogLoading
                    ? "Publishing..."
                    : "Publish Blog"
                }

              </button>

            </div>

          </div>

        </div>

        {/* =====================================================
            ALL HOROSCOPES
        ===================================================== */}

        <div className="mt-20">

          <h2 className="text-3xl font-bold text-yellow-400 mb-8">
            Uploaded Horoscopes
          </h2>

          {
            allHoroscopes.length === 0 ? (

              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center text-gray-400">
                No Horoscopes Uploaded
              </div>

            ) : (

              <div className="grid md:grid-cols-2 gap-6">

                {
                  allHoroscopes.map((item) => (

                    <div
                      key={item.id}
                      className="bg-white/5 border border-white/10 rounded-3xl p-6"
                    >

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="text-2xl font-bold text-yellow-400">
                            {item.zodiac}
                          </h3>

                          <p className="text-gray-300 mt-3 leading-relaxed">
                            {item.horoscope}
                          </p>

                        </div>

                        <button
                          onClick={() => deleteHoroscope(item.id)}
                          className="bg-red-500 px-4 py-2 rounded-xl h-fit hover:bg-red-600 transition"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  ))
                }

              </div>

            )
          }

        </div>

        {/* =====================================================
            ALL BLOGS
        ===================================================== */}

        <div className="mt-20">

          <h2 className="text-3xl font-bold text-yellow-400 mb-8">
            Uploaded Blogs
          </h2>

          {
            allBlogs.length === 0 ? (

              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center text-gray-400">
                No Blogs Uploaded
              </div>

            ) : (

              <div className="grid md:grid-cols-2 gap-6">

                {
                  allBlogs.map((blog) => (

                    <div
                      key={blog.id}
                      className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
                    >

                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-60 object-cover"
                      />

                      <div className="p-6">

                        <p className="text-yellow-400 text-sm mb-3">
                          {blog.category}
                        </p>

                        <h3 className="text-2xl font-bold mb-4">
                          {blog.title}
                        </h3>

                        <p className="text-gray-400 leading-relaxed line-clamp-4">
                          {blog.content}
                        </p>

                        <button
                          onClick={() => deleteBlog(blog.id)}
                          className="mt-6 bg-red-500 px-5 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
                        >
                          Delete Blog
                        </button>

                      </div>

                    </div>

                  ))
                }

              </div>

            )
          }

        </div>

      </div>

    </main>
  );
}