import { NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b1220] text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">

        {/* ===== BRAND ===== */}
        <div>
          <h2 className="text-2xl font-bold text-white">WatchStore
</h2>
          <p className="mt-3 text-sm text-gray-400">
         Highly rated store with a wide range of premium watches.
          </p>
        </div>

        {/* ===== NAV LINKS ===== */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className="hover:text-blue-400 transition"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="hover:text-blue-400 transition"
              >
                About
              </NavLink>
            </li>
            <li>
              {/* <NavLink
                to="/collection"
                className="hover:text-blue-400 transition"
              >
                Collection
              </NavLink> */}
            </li>
          </ul>
        </div>

        {/* ===== SOCIAL LINKS ===== */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4 text-xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaLinkedin />
            </a>
           
          </div>
        </div>

      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Emulous Learning. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
