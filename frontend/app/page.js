"use client";

import Link from "next/link";
import { useState } from "react";

import { motion } from "framer-motion";

import {
  MoonStar,
  Stars,
  HeartHandshake,
  BookOpenText,
  Hand,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);

  // =====================================================
  // ZODIAC SIGNS
  // =====================================================

  const zodiacSigns = [
    { name: "Aries", symbol: "♈" },
    { name: "Taurus", symbol: "♉" },
    { name: "Gemini", symbol: "♊" },
    { name: "Cancer", symbol: "♋" },
    { name: "Leo", symbol: "♌" },
    { name: "Virgo", symbol: "♍" },
    { name: "Libra", symbol: "♎" },
    { name: "Scorpio", symbol: "♏" },
    { name: "Sagittarius", symbol: "♐" },
    { name: "Capricorn", symbol: "♑" },
    { name: "Aquarius", symbol: "♒" },
    { name: "Pisces", symbol: "♓" },
  ];

  // =====================================================
  // FEATURES
  // =====================================================

  const features = [
    {
      title: "Compatibility",
      icon: HeartHandshake,
      desc: "Detailed marriage compatibility reports.",
      link: "/compatibility",
    },

    {
      title: "Daily Horoscope",
      icon: MoonStar,
      desc: "Daily zodiac predictions and cosmic guidance.",
      link: "/horoscope",
    },

    {
      title: "Palm Reading AI",
      icon: Hand,
      desc: "Scan your palm and discover AI-powered predictions.",
      link: "/palm-reading",
    },

    {
      title: "Astrology Blogs",
      icon: BookOpenText,
      desc: "Spiritual blogs and astrology knowledge.",
      link: "/blogs",
    },
  ];

  return (

    <main className="min-h-screen bg-[#030712] text-white overflow-hidden relative">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#17002d] via-[#020617] to-black" />

      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-purple-700/20 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-yellow-500/10 blur-3xl rounded-full" />

      {/* STARS */}

      <div className="absolute inset-0 opacity-30 pointer-events-none">

        <div className="absolute top-10 left-10 text-white">✦</div>
        <div className="absolute top-24 right-20 text-yellow-300">✦</div>
        <div className="absolute top-60 left-1/3 text-gray-300">✦</div>
        <div className="absolute top-96 right-1/4 text-white">✦</div>
        <div className="absolute bottom-40 left-20 text-yellow-300">✦</div>
        <div className="absolute bottom-20 right-10 text-white">✦</div>

      </div>

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="relative z-50 border-b border-white/10 backdrop-blur-xl bg-black/20">

        <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex items-center justify-between">

          {/* LOGO */}

          <div>

            <h1 className="text-2xl md:text-4xl font-bold tracking-[0.25em] text-yellow-400">
              ASTERAA
            </h1>

            <p className="text-[9px] md:text-[10px] tracking-[0.3em] text-gray-500 mt-1">
              COSMIC GUIDANCE
            </p>

          </div>

          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-8 text-gray-300 text-sm">

            <Link href="/" className="hover:text-yellow-400 transition">
              Home
            </Link>

            <Link
              href="/compatibility"
              className="hover:text-yellow-400 transition"
            >
              Compatibility
            </Link>

            <Link
              href="/horoscope"
              className="hover:text-yellow-400 transition"
            >
              Horoscope
            </Link>

            <Link
              href="/palm-reading"
              className="hover:text-yellow-400 transition"
            >
              Palm AI
            </Link>

            <Link
              href="/blogs"
              className="hover:text-yellow-400 transition"
            >
              Blogs
            </Link>

          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >

            {
              menuOpen ? <X size={28} /> : <Menu size={28} />
            }

          </button>

        </div>

        {/* MOBILE MENU */}

        {
          menuOpen && (

            <div className="md:hidden border-t border-white/10 bg-[#050816]">

              <div className="flex flex-col px-6 py-6 gap-5 text-gray-300">

                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-400"
                >
                  Home
                </Link>

                <Link
                  href="/compatibility"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-400"
                >
                  Compatibility
                </Link>

                <Link
                  href="/horoscope"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-400"
                >
                  Horoscope
                </Link>

                <Link
                  href="/palm-reading"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-400"
                >
                  Palm Reading AI
                </Link>

                <Link
                  href="/blogs"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-400"
                >
                  Blogs
                </Link>

              </div>

            </div>

          )
        }

      </nav>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-xs md:text-sm mb-8">

            <Stars size={16} />

            Premium Astrology Platform

          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">

            Discover Your

            <span className="block text-yellow-400 mt-2">
              Cosmic Destiny
            </span>

          </h2>

          <p className="text-gray-400 text-base md:text-lg mt-8 leading-relaxed max-w-xl">

            Asteraa combines timeless astrology with AI-powered spiritual
            experiences including palm reading, compatibility reports,
            horoscopes, and cosmic guidance.

          </p>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Link
              href="/palm-reading"
              className="px-8 py-4 rounded-2xl bg-yellow-400 text-black text-center font-semibold hover:scale-105 transition duration-300"
            >
              Scan Your Palm
            </Link>

            <Link
              href="/horoscope"
              className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-center transition"
            >
              Daily Horoscope
            </Link>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-3 gap-4 md:gap-6 mt-14">

            <div>

              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">
                10K+
              </h3>

              <p className="text-gray-500 text-xs md:text-sm mt-1">
                Reports
              </p>

            </div>

            <div>

              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">
                AI
              </h3>

              <p className="text-gray-500 text-xs md:text-sm mt-1">
                Palm Analysis
              </p>

            </div>

            <div>

              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">
                24/7
              </h3>

              <p className="text-gray-500 text-xs md:text-sm mt-1">
                Insights
              </p>

            </div>

          </div>

        </motion.div>

        {/* RIGHT CARD */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >

          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-purple-600/20 blur-3xl rounded-full" />

          <div className="relative bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-2xl overflow-hidden">

            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-3xl rounded-full" />

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                    Exclusive
                    <span className="block text-yellow-400 mt-1">
                      Palm Reading AI
                    </span>
                  </h3>

                  <p className="text-gray-400 mt-3 text-sm md:text-base">
                    Scan your hand and unlock your future instantly
                  </p>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 flex items-center justify-center">

                  <Hand
                    size={34}
                    className="text-yellow-400"
                  />

                </div>

              </div>

              <div className="bg-[#0D1323] border border-white/10 rounded-3xl p-6">

                <div className="flex items-center gap-3 mb-5">

                  <Sparkles
                    size={20}
                    className="text-yellow-400"
                  />

                  <p className="text-yellow-400 font-semibold">
                    AI Palm Scanner
                  </p>

                </div>

                <div className="space-y-4">

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">

                    <p className="text-sm text-gray-400 mb-2">
                      Personality
                    </p>

                    <h4 className="text-lg font-semibold">
                      Creative & Intuitive
                    </h4>

                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">

                    <p className="text-sm text-gray-400 mb-2">
                      Love Life
                    </p>

                    <h4 className="text-lg font-semibold">
                      Emotionally Balanced
                    </h4>

                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">

                    <p className="text-sm text-gray-400 mb-2">
                      Career
                    </p>

                    <h4 className="text-lg font-semibold">
                      Leadership & Creativity
                    </h4>

                  </div>

                </div>

                <Link
                  href="/palm-reading"
                  className="block mt-8 w-full text-center py-4 rounded-2xl bg-yellow-400 text-black font-bold hover:scale-[1.02] transition duration-300"
                >
                  Try Palm Reading AI
                </Link>

              </div>

            </div>

          </div>

        </motion.div>

      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 py-20">

        <div className="text-center mb-16">

          <p className="text-yellow-400 tracking-[0.3em] text-sm mb-4">
            PREMIUM FEATURES
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Explore Asteraa
          </h2>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {
            features.map((item, index) => {

              const Icon = item.icon;

              return (

                <Link href={item.link} key={index}>

                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-yellow-400/30 transition duration-300 cursor-pointer h-full"
                  >

                    <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 flex items-center justify-center mb-6">

                      <Icon
                        className="text-yellow-400"
                        size={30}
                      />

                    </div>

                    <h3 className="text-2xl font-semibold mb-4">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>

                  </motion.div>

                </Link>
              );
            })
          }

        </div>

      </section>

      {/* =====================================================
          ZODIAC SIGNS
      ===================================================== */}

      <section className="relative z-10 py-20 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-5 md:px-10">

          <div className="text-center mb-14">

            <p className="text-yellow-400 tracking-[0.3em] text-sm mb-4">
              DAILY HOROSCOPE
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Zodiac Signs
            </h2>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">

            {
              zodiacSigns.map((sign, index) => (

                <Link
                  href={`/horoscope/${sign.name.toLowerCase()}`}
                  key={index}
                >

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#0D1323] border border-white/10 rounded-3xl p-6 text-center hover:border-yellow-400/30 transition cursor-pointer"
                  >

                    <div className="text-5xl text-yellow-400 mb-4">
                      {sign.symbol}
                    </div>

                    <h3 className="font-semibold text-lg">
                      {sign.name}
                    </h3>

                  </motion.div>

                </Link>

              ))
            }

          </div>

        </div>

      </section>
       <div className="mt-24 px-6">

          <div className="max-w-7xl mx-auto">

           <h2 className="text-4xl md:text-5xl font-bold text-center text-yellow-400 mb-6">
           Kundali Chakra
           </h2>

           <p className="text-center text-gray-400 text-lg mb-10 max-w-3xl mx-auto">
           Your cosmic blueprint and divine path through Vedic astrology.
           </p>

          <div className="rounded-[32px] overflow-hidden border border-yellow-500/20 shadow-2xl">

           <img
           src="/kundali-chakra.jpeg"
           alt="Kundali Chakra"
           className="w-full object-cover"
           />

            </div>

           </div>

           </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/10 py-10 relative z-10">

        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-center md:text-left">

            <h3 className="text-2xl font-bold tracking-[0.2em] text-yellow-400">
              ASTERAA
            </h3>

            <p className="text-gray-500 mt-2 text-sm">
              Ancient Wisdom • Modern AI Experience
            </p>

          </div>

          <div className="flex gap-6 text-gray-400 text-sm">

            <a href="#" className="hover:text-yellow-400 transition">
              Privacy
            </a>

            <a href="#" className="hover:text-yellow-400 transition">
              Terms
            </a>

            <a href="#" className="hover:text-yellow-400 transition">
              Contact
            </a>

          </div>

        </div>

      </footer>

    </main>
  );
}