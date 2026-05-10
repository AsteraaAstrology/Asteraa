export default function Footer() {

  return (
    <footer className="border-t border-white/10 bg-[#070B16] py-10">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        <div>

          <h2 className="text-2xl font-bold tracking-[0.2em] text-yellow-400">
            ASTERAA
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Ancient Wisdom • Modern Experience
          </p>

        </div>

        <div className="flex gap-8 text-gray-400 text-sm">

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
  );
}