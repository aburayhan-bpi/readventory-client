import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-16 pb-10 px-6 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <img
            src="https://i.ibb.co/RTLQkGsH/readventory-logo.png"
            alt="readventory_logo"
            className="w-36 mb-4"
          />
          <p className="text-sm leading-relaxed">
            Readventory helps you manage books, borrowing, and summaries with
            ease.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Services
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/books" className="hover:text-indigo-500 transition">
                Book Management
              </Link>
            </li>
            <li>
              <Link
                to="/borrow-summary"
                className="hover:text-indigo-500 transition"
              >
                Borrow Summary
              </Link>
            </li>
            <li>
              <Link
                to="/create-book"
                className="hover:text-indigo-500 transition"
              >
                Add New Books
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-indigo-500 transition">
                Search & Filter
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-indigo-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-indigo-500 transition">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-indigo-500 transition">
                Press
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-indigo-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Legal
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-indigo-500 transition">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-indigo-500 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-indigo-500 transition">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center mt-12 border-t pt-6 text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Readventory — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
