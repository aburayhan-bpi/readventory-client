import RootLayout from "@/Layout/RootLayout";
import AboutUs from "@/pages/AboutUs";
import Books from "@/pages/Books";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";
import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/EditBook";
import Home from "@/pages/Home";
import ViewBook from "@/pages/ViewBook";
import { createBrowserRouter } from "react-router";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "create-book",
        element: <CreateBook />,
      },
      {
        path: "books/:id",
        element: <ViewBook />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "borrow/:bookId",
        element: <BorrowBook />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
    ],
  },
]);

export default routes;
