import { useState } from 'react';
import { ConfigProvider, theme, Button, Card } from 'antd';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { useTheme } from './store/ThemeContext';

import AdminLayout from './components/adminLayout/AdminLayout';
import Home from './pages/home/Home';
import Shops from './pages/shops/Shops';
import Categories from './pages/categories/Categories';
import NewOrder from './pages/newOrder/NewOrder';
import Customers from './pages/customers/Customers';
import ExpenseDirections from './pages/expenseDirections/ExpenseDirections';
import Expenses from './pages/expenses/Expenses';
import Orders from './pages/orders/Orders';
import NotFound from './pages/notFound/NotFound';
import Customer from './pages/customers/Customer';
import Reports from './pages/reports/Reports';
import Login from './pages/login/Login';
import { Profile } from './pages/profile/Profile';
// import AuthProvider from 'react-auth-kit/dist/AuthProvider';
// import PrivateRoute from 'react-auth-kit/dist/PrivateRoute';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import Order from './pages/orders/Order';

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const { isDarkMode, toggleDarkMode } = useTheme();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <AdminLayout isDarkMode={isDarkMode} handleThemeChange={toggleDarkMode} />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/customers">
            <Route index element={<Customers />} />
            <Route path=":customerId" element={<Customer />} />
          </Route>
          <Route path="/categories" element={<Categories />} />
          <Route path="/expense-directions" element={<ExpenseDirections />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/orders">
            <Route index element={<Orders />} />
            <Route path="new-order" element={<NewOrder />} />
            <Route path=":orderId" element={<Order />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound message="Կներեք, նման էջ գոյություն չունի" />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </>,
    ),
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <AuthProvider authType={'localstorage'} authName={'_auth'}>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
