"use client";

import { useState } from "react";
import axios from "axios";

export default function PalmReadingPage() {

  // =====================================================
  // STATES
  // =====================================================

  const [selectedImage, setSelectedImage] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  // =====================================================
  // UPLOAD PALM
  // =====================================================

  const uploadPalm = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(
      URL.createObjectURL(file)
    );

    const formData = new FormData();

    formData.append("image", file);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/scan-palm",
        formData
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);

      alert("Palm scan failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <main className="min-h-screen bg-[#030712] text-white px-6 py-16">

      <div className="max-w-5xl mx-auto">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="text-center mb-14">

          <p className="text-yellow-400 tracking-[0.3em] text-sm mb-4">
            ASTERAA AI
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AI Palm Reader
          </h1>

          <p className="text-gray-400 text-lg">
            Upload your palm image and discover your destiny
          </p>

        </div>

        {/* =====================================================
            UPLOAD CARD
        ===================================================== */}

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

          <div className="flex flex-col items-center">

            {/* IMAGE UPLOAD */}

            <label className="w-full max-w-md cursor-pointer">

              <div className="bg-yellow-400 text-black text-center py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition">

                Upload Palm Image

              </div>

              <input
                type="file"
                accept="image/*"
                onChange={uploadPalm}
                className="hidden"
              />

            </label>

            {/* PREVIEW IMAGE */}

            {
              selectedImage && (

                <img
                  src={selectedImage}
                  alt="Palm Preview"
                  className="mt-8 w-full max-w-md rounded-3xl border border-white/10"
                />
              )
            }

            {/* LOADING */}

            {
              loading && (

                <div className="mt-8">

                  <p className="text-yellow-400 text-lg">
                    Analyzing Palm...
                  </p>

                </div>
              )
            }

          </div>

        </div>

        {/* =====================================================
            RESULT
        ===================================================== */}

        {
          result && result.success && (

            <div className="mt-14 bg-white/5 border border-white/10 rounded-[32px] p-8">

              <h2 className="text-4xl font-bold text-yellow-400 mb-10">
                Palm Analysis
              </h2>

              {/* MAIN ANALYSIS */}

              <div className="grid md:grid-cols-2 gap-8">

                <div className="bg-[#0D1323] rounded-3xl p-6">

                  <h3 className="text-2xl font-bold mb-4">
                    Personality
                  </h3>

                  <p className="text-gray-300">
                    {result.analysis.personality}
                  </p>

                </div>

                <div className="bg-[#0D1323] rounded-3xl p-6">

                  <h3 className="text-2xl font-bold mb-4">
                    Career
                  </h3>

                  <p className="text-gray-300">
                    {result.analysis.career}
                  </p>

                </div>

                <div className="bg-[#0D1323] rounded-3xl p-6">

                  <h3 className="text-2xl font-bold mb-4">
                    Love
                  </h3>

                  <p className="text-gray-300">
                    {result.analysis.love}
                  </p>

                </div>

                <div className="bg-[#0D1323] rounded-3xl p-6">

                  <h3 className="text-2xl font-bold mb-4">
                    Health
                  </h3>

                  <p className="text-gray-300">
                    {result.analysis.health}
                  </p>

                </div>

              </div>

              {/* PALM LINES */}

              <div className="grid md:grid-cols-3 gap-6 mt-10">

                <div className="bg-[#0D1323] rounded-3xl p-6">

                  <h3 className="text-xl font-bold text-yellow-400 mb-3">
                    Heart Line
                  </h3>

                  <p className="text-gray-300">
                    {result.analysis.heartLine.prediction}
                  </p>

                </div>

                <div className="bg-[#0D1323] rounded-3xl p-6">

                  <h3 className="text-xl font-bold text-yellow-400 mb-3">
                    Head Line
                  </h3>

                  <p className="text-gray-300">
                    {result.analysis.headLine.prediction}
                  </p>

                </div>

                <div className="bg-[#0D1323] rounded-3xl p-6">

                  <h3 className="text-xl font-bold text-yellow-400 mb-3">
                    Life Line
                  </h3>

                  <p className="text-gray-300">
                    {result.analysis.lifeLine.prediction}
                  </p>

                </div>

              </div>

            </div>
          )
        }

      </div>

    </main>
  );
}