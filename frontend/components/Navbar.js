"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#070B16]/80 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <Link href="/">
          <h1 className="text-3xl font-bold tracking-[0.25em] text-yellow-400 cursor-pointer">
            ASTERAA
          </h1>
        </Link>

        <div className="hidden md:flex gap-8 text-gray-300">

          <Link href="/" className="hover:text-yellow-400 transition">
            Home
          </Link>

          <Link href="/compatibility" className="hover:text-yellow-400 transition">
            Compatibility
          </Link>

          <Link href="/horoscope" className="hover:text-yellow-400 transition">
            Horoscope
          </Link>

          <Link href="/blogs" className="hover:text-yellow-400 transition">
            Blogs
          </Link>

          <Link href="/contact" className="hover:text-yellow-400 transition">
            Contact
          </Link>

        </div>

        <button className="md:hidden">
          <Menu size={28} />
        </button>

      </div>

    </nav>
  );
}