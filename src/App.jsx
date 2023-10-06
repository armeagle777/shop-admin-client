import { useState } from 'react';
import { ConfigProvider, theme, Button, Card } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import Reports from './pages/reports/Reports'

function App() {
    const { defaultAlgorithm, darkAlgorithm } = theme;

    const { isDarkMode, toggleDarkMode } = useTheme();

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <AdminLayout
                    isDarkMode={isDarkMode}
                    handleThemeChange={toggleDarkMode}
                />
            ),
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/shops',
                    element: <Shops />,
                },
                {
                    path: '/customers',
                    children: [
                        {
                            index: true,
                            element: <Customers />,
                        },
                        {
                            path: ':customerId',
                            element: <Customer />,
                        },
                    ],
                },
                {
                    path: '/categories',
                    element: <Categories />,
                },
                {
                    path: '/expense-directions',
                    element: <ExpenseDirections />,
                },
                {
                    path: '/expenses',
                    element: <Expenses />,
                },
                {
                    path: '/reports',
                    element: <Reports />,
                },
                {
                    path: '/orders',
                    children: [
                        {
                            index: true,
                            element: <Orders />,
                        },
                        {
                            path: 'new-order',
                            element: <NewOrder />,
                        },
                    ],
                },
                {
                    path: '*',
                    element: (
                        <NotFound message='Կներեք, նման էջ գոյություն չունի' />
                    ),
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
