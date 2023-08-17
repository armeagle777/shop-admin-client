import axios from 'axios';

const serverApi = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getCustomers = async () => {
    const response = await serverApi.get(
        '/customers?filters[isActive][$eq]=true&populate=*&sort[0]=id:desc'
    );
    return response.data;
};

export const addCustomer = async (customer) => {
    return await serverApi.post('/customers/create-with-relation', {
        data: customer,
    });
};

export const deleteCustomer = async (id) => {
    return await serverApi.put(`/customers/${id}`, {
        data: { isActive: false },
    });
};

export const getShops = async () => {
    const response = await serverApi.get(
        '/shops?filters[isActive][$eq]=true&populate=*'
    );
    return response.data;
};

export const addShop = async (shop) => {
    return await serverApi.post('/shops', {
        data: shop,
    });
};

export const deleteShop = async (id) => {
    return await serverApi.put(`/shops/${id}`, {
        data: { isActive: false },
    });
};

export const addExpenseDirection = async (newDirection) => {
    return await serverApi.post('/expense-directions', {
        data: newDirection,
    });
};

export const getExpenseDirections = async () => {
    const response = await serverApi.get(
        '/expense-directions?filters[isActive][$eq]=true&populate=*'
    );
    return response.data;
};

export const deleteExpenseDirections = async (id) => {
    return await serverApi.put(`/expense-directions/${id}`, {
        data: { isActive: false },
    });
};

export const getCategories = async () => {
    const response = await serverApi.get(
        '/categories?filters[isActive][$eq]=true&populate=*'
    );
    return response.data;
};

export const addCategory = async (newCategory) => {
    return await serverApi.post('/categories', {
        data: newCategory,
    });
};

export const deleteCategory = async (id) => {
    return await serverApi.put(`/categories/${id}`, {
        data: { isActive: false },
    });
};

export const addExpense = async (newExpense) => {
    return await serverApi.post('/expenses', {
        data: newExpense,
    });
};

export const getExpenses = async () => {
    const response = await serverApi.get(
        '/expenses?filters[isActive][$eq]=true&populate=*&sort[0]=id:desc'
    );
    return response.data;
};

export const deleteExpense = async (id) => {
    return await serverApi.put(`/expenses/${id}`, {
        data: { isActive: false },
    });
};

export const addOrder = async (newOrder) => {
    return await serverApi.post('/orders', {
        data: newOrder,
    });
};

export const removeOrder = async ({ record, newStatus }) => {
    return await serverApi.post('/orders/make-order-canceled', {
        record,
        newStatus,
    });
};

export const getOrders = async () => {
    const response = await serverApi.get(
        `/orders?filters[isActive][$eq]=true&pagination[pageSize]=1000&populate[customer][populate]=*&populate[shop][populate]=*&populate[images][populate]=*&populate[category][populate]=*&sort[0]=order_date:desc`
    );

    return response.data.data;
};

export const editOrder = async ({ id, ...newData }) => {
    const response = await serverApi.put(`/orders/${id}`, {
        data: { ...newData },
    });

    return response.data.data;
};

export const deleteOrder = async (id) => {
    return await serverApi.delete(`/orders/${id}`, {
        data: { isActive: false },
    });
};

export const getCountries = async () => {
    const response = await serverApi.get(
        `/countries?populate[marzs][populate][communities][populate]=*`
    );

    return response.data.data;
};

export default serverApi;
