export default function ContactPage() {

  return (
    <main className="min-h-screen bg-[#070B16] text-white px-6 py-20">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">

          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">
            Contact Asteraa
          </h1>

          <p className="text-gray-400 text-lg">
            Connect with us for guidance, support, and astrology insights.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Left Info */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">

            <h2 className="text-3xl font-bold mb-8">
              Get In Touch
            </h2>

            <div className="space-y-6 text-gray-300">

              <div>
                <p className="text-yellow-400 mb-2">
                  Email
                </p>

                <p>
                  support@asteraa.com
                </p>
              </div>

              <div>
                <p className="text-yellow-400 mb-2">
                  Phone
                </p>

                <p>
                  +91 9876543210
                </p>
              </div>

              <div>
                <p className="text-yellow-400 mb-2">
                  Address
                </p>

                <p>
                  Guwahati, Assam, India
                </p>
              </div>

            </div>

          </div>

          {/* Form */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
              />

              <textarea
                rows="6"
                placeholder="Your Message"
                className="w-full bg-[#0D1323] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
              />

              <button className="w-full py-4 rounded-2xl bg-yellow-400 text-black font-bold hover:scale-[1.02] transition">
                Send Message
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}