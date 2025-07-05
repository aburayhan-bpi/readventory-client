// Keep your existing imports
import BookCard from "@/components/BookCard";
import Card from "@/components/Card";
import Feature from "@/components/Feature";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import {
  ArrowRightLeftIcon,
  BookOpenIcon,
  ClipboardListIcon,
  HelpCircleIcon,
  LightbulbIcon,
  MailIcon,
  PlusIcon,
  SparkleIcon,
} from "lucide-react";
import { Link } from "react-router";
import type { TBook } from "types";

const Home = () => {
  const { data: books, isLoading } = useGetBooksQuery(undefined);

  return (
    <div className="min-h-screen px-4 xl:px-0 max-w-7xl mx-auto">
      {/* HERO */}
      <section className="relative overflow-hidden mt-10 py-24 px-6 sm:px-10 lg:px-16 text-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg mb-20">
        {/* Decorative blurred background element */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-indigo-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Welcome to{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Readventory
            </span>{" "}
            📚
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Your smart, minimal, and efficient library management system — built
            for modern readers and librarians.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/books"
              className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-300 shadow-md"
            >
              📖 Explore Books
            </Link>
            <Link
              to="/create-book"
              className="px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900 font-medium transition duration-300"
            >
              ➕ Add a Book
            </Link>
          </div>
        </div>
      </section>

      {/* ACTION CARDS */}
      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-20">
        <Link to="/books">
          <Card
            icon={<BookOpenIcon />}
            title="All Books"
            desc="Explore your full collection."
          />
        </Link>
        <Link to="/create-book">
          <Card
            icon={<PlusIcon />}
            title="Add New Book"
            desc="Add books instantly to your system."
          />
        </Link>
        <Link to="/borrow-summary">
          <Card
            icon={<ClipboardListIcon />}
            title="Borrow Summary"
            desc="Track who borrowed what and when."
          />
        </Link>
      </section>

      {/* FEATURED BOOKS */}
      <section className="mb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            📘 Latest Books
          </h2>
          <Link
            to="/books"
            className="text-indigo-600 font-medium hover:underline"
          >
            See All
          </Link>
        </div>

        {isLoading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading books...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books?.data?.slice(0, 6).map((book: TBook) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* FEATURES */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6 rounded-xl mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          💡 Why Choose Readventory?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <Feature
            icon={<LightbulbIcon size={36} />}
            title="Minimal UI"
            desc="Clean, clutter-free, responsive design."
          />
          <Feature
            icon={<ArrowRightLeftIcon size={36} />}
            title="Real-Time Updates"
            desc="Borrowing updates instantly."
          />
          <Feature
            icon={<ClipboardListIcon size={36} />}
            title="Track Easily"
            desc="Find, borrow, return — in seconds."
          />
        </div>
      </section>

      {/* WHAT'S NEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mb-24 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white flex justify-center items-center gap-3">
              <SparkleIcon className="text-indigo-600 dark:text-indigo-400 w-8 h-8" />
              What’s New in <span className="text-indigo-600">Readventory</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the latest improvements, features, and updates to enhance
              your experience.
            </p>
          </div>

          <ul className="space-y-8 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-1 before:bg-indigo-200 dark:before:bg-gray-600 before:rounded-full">
            {/* Item 1 */}
            <li className="relative pl-16">
              <div className="absolute top-1 left-2 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <ClipboardListIcon className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Real-Time Borrow Summary
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Instantly track borrowing status and returns with our new live
                summary panel.
              </p>
            </li>

            {/* Item 2 */}
            <li className="relative pl-16">
              <div className="absolute top-1 left-2 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <SparkleIcon className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Dark Mode Support
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Enable dark mode with a toggle in the navbar. Smooth visuals,
                day or night.
              </p>
            </li>

            {/* Item 3 */}
            <li className="relative pl-16">
              <div className="absolute top-1 left-2 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <LightbulbIcon className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Enhanced Performance
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Enjoy faster page loads, smooth transitions, and optimized
                codebase.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mb-24 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-sm border-t dark:border-gray-700">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-3">
              <HelpCircleIcon className="text-indigo-600 dark:text-indigo-400 w-8 h-8" />
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Everything you need to know about using Readventory.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-10 text-left">
            {/* FAQ item */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                ❓ How can I add a book?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Just click on “Add New Book”, fill in the required fields, and
                your book will be added instantly.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                📚 Can I track borrowed books?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Absolutely. Visit the Borrow Summary page to view all borrowing
                activities and return statuses.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                🌙 Is dark mode supported?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes! Toggle the dark mode switch in the top-right corner of the
                navbar anytime.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                💻 Can I use Readventory on mobile?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Definitely. The entire platform is fully responsive and
                optimized for mobile and tablets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EMAIL SUBSCRIBE */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-md mt-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
            💌 Stay Connected with Readventory
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Subscribe to get the latest updates, book releases, and features
            straight to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300 hover:cursor-pointer"
            >
              <MailIcon size={20} />
              Subscribe
            </button>
          </form>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
