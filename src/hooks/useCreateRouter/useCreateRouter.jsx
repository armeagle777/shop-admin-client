import { RequireAuth } from 'react-auth-kit';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { useTheme } from '../../store/ThemeContext';
import AdminLayout from '../../components/adminLayout_/AdminLayout';
import {
  Home,
  Shops,
  Login,
  Order,
  Orders,
  Reports,
  Profile,
  Customer,
  Expenses,
  NewOrder,
  NotFound,
  Customers,
  Categories,
  ExpenseDirections,
} from '../../pages';

const useCreateRouter = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <AdminLayout
                isDarkMode={isDarkMode}
                handleThemeChange={toggleDarkMode}
              />
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
          <Route
            path="*"
            element={<NotFound message="Կներեք, նման էջ գոյություն չունի" />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </>,
    ),
  );

  return router;
};

export default useCreateRouter;
