import { useState } from "react";
import { ConfigProvider, theme, Button, Card } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminLayout from "./components/adminLayout/AdminLayout";
import Home from "./pages/home/Home";
import Shops from "./pages/shops/Shops";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const handleThemeChange = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AdminLayout
          isDarkMode={isDarkMode}
          handleThemeChange={handleThemeChange}
        />
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/shops",
          element: <Shops />,
        },
      ],
    },
  ]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
