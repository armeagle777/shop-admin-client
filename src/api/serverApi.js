import axios from 'axios';

const serverApi = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getCustomers = async () => {
    const response = await serverApi.get(
        '/customers?filters[isActive][$eq]=true&pagination[pageSize]=1000&populate=*&sort[0]=id:desc'
    );
    return response.data;
};

export const getCustomerById = async (id) => {
    const response = await serverApi.get(
        `/customers/${id}?populate[addresses][populate]=*&populate[Avatar][populate]=*&populate[contacts]populate=*&populate[orders][populate]=*&populate[segments][populate]=*`
    );
    return response.data;
};

export const addCustomer = async (customer) => {
    return await serverApi.post('/customers/create-with-relation', {
        data: customer,
    });
};
export const editCustomer = async ({ item, customerId }) => {
    return await serverApi.put(`/customers/edit-customers/${customerId}`, {
        data: item,
    });
};

export const deleteCustomer = async (id) => {
    return await serverApi.put(`/customers/${id}`, {
        data: { isActive: false },
    });
};

export const getShops = async () => {
    const response = await serverApi.get(
        '/shops?filters[isActive][$eq]=true&pagination[pageSize]=1000&populate=*'
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
        '/expense-directions?filters[isActive][$eq]=true&pagination[pageSize]=1000&populate=*'
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
        '/categories?filters[isActive][$eq]=true&pagination[pageSize]=1000&populate=*'
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
        '/expenses?filters[isActive][$eq]=true&pagination[pageSize]=1000&populate=*&sort[0]=id:desc'
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

export const getOrders = async (filter) => {
    const url = filter ? `/orders?filters[isActive][$eq]=true&filters[status][$eq]=${filter}&pagination[pageSize]=10000&populate[customer][populate][0]=addresses&populate[customer][populate][1]=Avatar&populate[customer][populate][2]=contacts&populate[shop][populate][0]=logo&populate[images][populate]=url&populate[category][populate]=image&sort[0]=order_date:desc` :'/orders?filters[isActive][$eq]=true&pagination[pageSize]=10000&populate[customer][populate][0]=addresses&populate[customer][populate][1]=Avatar&populate[customer][populate][2]=contacts&populate[shop][populate][0]=logo&populate[images][populate]=url&populate[category][populate]=image&sort[0]=order_date:desc'
    const response = await serverApi.get(url);

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
        `/countries?pagination[pageSize]=1000&populate[marzs][populate][communities][populate]=*`
    );

    return response.data.data;
};

export default serverApi;
