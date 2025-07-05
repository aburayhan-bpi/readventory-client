import { ModeToggle } from "@/components/mode-toggler";
import { useState } from "react";

// react icons
import { CiMenuFries } from "react-icons/ci";
import { NavLink } from "react-router";

const Navbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-300 dark:border-gray-700 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-0">
        {/* logo */}
        <NavLink to="/">
          <img
            src="https://i.ibb.co/RTLQkGsH/readventory-logo.png"
            alt="readventory_logo"
            className="w-32 select-none"
            draggable={false}
          />
        </NavLink>

        {/* nav links */}
        <ul className="hidden md:flex items-center gap-6 text-base text-gray-700 dark:text-[#abc2d3]">
          {[
            { to: "/", label: "Home" },
            { to: "/books", label: "All Books" },
            { to: "/create-book", label: "Add Book" },
            { to: "/borrow-summary", label: "Borrow Summary" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative cursor-pointer capitalize before:absolute before:bottom-[-4px] before:left-0 before:h-[2px] before:rounded-full before:bg-[#3B9DF8] before:transition-all before:duration-300
                 ${
                   isActive
                     ? "before:w-full text-[#3B9DF8]"
                     : "before:w-0 hover:before:w-full hover:text-[#3B9DF8] text-gray-700 dark:text-[#abc2d3]"
                 }`
              }
            >
              {label}
            </NavLink>
          ))}
        </ul>

        {/* action buttons */}
        <div className="flex items-center gap-4">
          <ModeToggle />

          <CiMenuFries
            className="md:hidden text-2xl text-gray-700 dark:text-[#abc2d3] cursor-pointer"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />
        </div>
      </div>

      {/* mobile sidebar */}
      <aside
        className={`fixed top-[60px] right-0 w-full sm:w-1/2 bg-sky-100 dark:bg-slate-700 p-6 rounded-l-md shadow-lg transition-transform duration-300 ease-in-out
          ${
            mobileSidebarOpen
              ? "translate-x-0 opacity-100 z-50"
              : "translate-x-full opacity-0 -z-10"
          } md:hidden`}
      >
        <ul className="flex flex-col gap-5 text-gray-700 dark:text-[#abc2d3] text-lg">
          {[
            { to: "/", label: "Home" },
            { to: "/books", label: "Books" },
            { to: "/create-book", label: "Create Book" },
            { to: "/borrow-summary", label: "Borrow Summary" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileSidebarOpen(false)}
              className={({ isActive }) =>
                `relative cursor-pointer capitalize before:absolute before:bottom-[-4px] before:left-0 before:h-[2px] before:rounded-full before:bg-[#3B9DF8] before:transition-all before:duration-300
                 ${
                   isActive
                     ? "before:w-full text-[#3B9DF8]"
                     : "before:w-0 hover:before:w-full hover:text-[#3B9DF8]"
                 }`
              }
            >
              {label}
            </NavLink>
          ))}
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
