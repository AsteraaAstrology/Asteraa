"use client";

import { useEffect, useState } from "react";

export default function HoroscopePage() {

  const [horoscopes, setHoroscopes] = useState([]);

  // =====================================================
  // FETCH HOROSCOPES
  // =====================================================

  useEffect(() => {

    fetch("https://asteraa.onrender.com/horoscopes")
      .then((res) => res.json())
      .then((data) => {

        // SUPPORT BOTH ARRAY + OBJECT RESPONSE

        if (Array.isArray(data)) {

          setHoroscopes(data);

        } else if (Array.isArray(data.horoscopes)) {

          setHoroscopes(data.horoscopes);

        } else {

          setHoroscopes([]);
        }

      })
      .catch((error) => {

        console.log(error);

        setHoroscopes([]);

      });

  }, []);

  return (

    <main className="min-h-screen bg-[#030712] text-white px-6 py-20">

      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="text-center mb-20">

          <p className="text-yellow-400 tracking-[0.3em] text-sm mb-4">
            ASTERAA DAILY HOROSCOPE
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Zodiac Predictions
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore your daily horoscope guidance for love,
            career, emotions, health, and spiritual energy.
          </p>

        </div>

        {/* =====================================================
            HOROSCOPES
        ===================================================== */}

        {
          horoscopes.length === 0 ? (

            <div className="text-center py-20">

              <h2 className="text-3xl font-bold mb-4">
                No Horoscope Available
              </h2>

              <p className="text-gray-400">
                Today's horoscope has not been uploaded yet.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {
                horoscopes.map((item) => (

                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl hover:border-yellow-400/30 transition"
                  >

                    <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                      {item.zodiac}
                    </h2>

                    <p className="text-gray-300 leading-8">
                      {item.horoscope}
                    </p>

                  </div>

                ))
              }

            </div>

          )
        }

      </div>

    </main>
  );
}