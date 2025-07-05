import Footer from "@/components/common/Footer/Footer";
import Navbar from "@/components/common/Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  document.title = "Readventory";
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {/* Navbar */}
        <header className="shadow-sm mb-14">
          <Navbar />
        </header>

        {/* Main content */}
        <main className="flex-1 px-4 xl:px-0 max-w-7xl mx-auto w-full py-6">
          <Outlet />
        </main>
      </div>
      {/* Footer */}
      <footer className="bg-base-200 dark:bg-gray-900 text-base-content dark:text-gray-300 mt-32 bottom-0">
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
