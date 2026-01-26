import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b1220] text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* ===== Brand Info ===== */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Watch<span className="text-blue-500">Shop</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Premium products with trusted quality.  
            Shop smart, shop secure.
          </p>
        </div>

        {/* ===== Quick Links ===== */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Shop</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* ===== Support ===== */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Return Policy</li>
          </ul>
        </div>

        {/* ===== Social Media ===== */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition">
              <FaFacebookF />
            </a>
            <a className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition">
              <FaInstagram />
            </a>
            <a className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition">
              <FaTwitter />
            </a>
            <a className="p-2 bg-gray-800 rounded-full hover:bg-gray-600 transition">
              <FaGithub />
            </a>
          </div>
        </div>

      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="border-t border-gray-800 mt-10 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} InkShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
