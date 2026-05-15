"use client";

import { useState } from "react";

export default function CompatibilityPage() {

  const [brideName, setBrideName] = useState("");
  const [brideDob, setBrideDob] = useState("");

  const [groomName, setGroomName] = useState("");
  const [groomDob, setGroomDob] = useState("");

  const [result, setResult] = useState(null);

  const generateReport = async () => {

  try {

    setResult(null);

    const url =
      `https://asteraa.onrender.com/match?bride_name=${encodeURIComponent(brideName)}&bride_dob=${encodeURIComponent(brideDob)}&groom_name=${encodeURIComponent(groomName)}&groom_dob=${encodeURIComponent(groomDob)}`;

    const response = await fetch(url);

    if (!response.ok) {

      throw new Error("API Failed");
    }

    const data = await response.json();

    console.log(data);

    setResult(data);

  } catch (error) {

    console.error(error);

    alert(error.message);
  }
};

  return (

    <main className="min-h-screen bg-[#070B16] text-white px-6 py-20">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-16">

          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">
            Marriage Compatibility
          </h1>

          <p className="text-gray-400 text-lg">
            Discover emotional harmony, future married life,
            and relationship compatibility with Asteraa.
          </p>

        </div>

        <div className="mb-14 rounded-[32px] overflow-hidden border border-yellow-500/20">

         <img
         src="/compatibility-banner.jpeg"
         alt="Compatibility Banner"
         className="w-full h-[500px] object-cover"
         />

        </div>

        {/* Form */}

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12">

          <div className="grid md:grid-cols-2 gap-8">

            {/* Bride */}

            <div className="space-y-5">

              <h2 className="text-2xl font-bold">
                Bride Details
              </h2>

              <input
                type="text"
                placeholder="Bride Name"
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="date"
                value={brideDob}
                onChange={(e) => setBrideDob(e.target.value)}
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

            </div>

            {/* Groom */}

            <div className="space-y-5">

              <h2 className="text-2xl font-bold">
                Groom Details
              </h2>

              <input
                type="text"
                placeholder="Groom Name"
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="date"
                value={groomDob}
                onChange={(e) => setGroomDob(e.target.value)}
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

            </div>

          </div>

          {/* Button */}

          <button
            onClick={generateReport}
            className="w-full mt-10 py-5 rounded-2xl bg-yellow-400 text-black text-lg font-bold hover:scale-[1.01] transition"
          >
            Generate Compatibility Report
          </button>

        </div>

        {/* Result */}

        {result && (

          <div className="mt-14 bg-white/5 border border-white/10 rounded-[32px] p-10">

            <h2 className="text-4xl font-bold text-yellow-400 mb-10">
              Compatibility Result
            </h2>

            <div className="space-y-5 text-lg">

              <p>
                Bride:
                <span className="text-yellow-400 ml-2">
                  {result.bride_name}
                </span>
              </p>

              <p>
                Groom:
                <span className="text-yellow-400 ml-2">
                  {result.groom_name}
                </span>
              </p>

              

              <p>
                Compatibility Score:
                <span className="text-yellow-400 ml-2">
                  {result.score}%
                </span>
              </p>

              <p>
                Result:
                <span className="text-yellow-400 ml-2">
                  {result.result}
                </span>
              </p>

              <div className="pt-8">

                <h3 className="text-2xl font-bold mb-5 text-yellow-400">
                  Future Married Life
                </h3>

                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {result.future}
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}