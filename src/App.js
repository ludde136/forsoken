import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Ikkefunnet from "./components/ikkefunnet";
import Home from "./components/Home";
import Vishytter from "./components/hytter/Vishytter";
import HytteInfo from "./components/hytter/HytteInfo";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Ikkefunnet />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/se-alle-hytter",
          element: <Vishytter />,
        },
        {
          path: "/se-alle-hytter/:sted",
          element: <HytteInfo />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
