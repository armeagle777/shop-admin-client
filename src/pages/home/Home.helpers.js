import { isAfter, isBefore, isEqual } from 'date-fns';
import delve from 'dlv';

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
}

function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0);
}

export function getCurrentYearAndPast11Months(expenses, orders) {
    const months = [
        'Հունվ․',
        'Փետր․',
        'Մրտ․',
        'Ապր․',
        'Մայ․',
        'Հնս',
        'Հլս․',
        'Օգստ․',
        'Սեպտ․',
        'Հոկտ․',
        'Նոյ․',
        'Դեկտ․',
    ];

    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    const monthsData = [];

    for (let i = 0; i < 12; i++) {
        const monthName = months[currentMonth];
        const currentMonthOrders = orders?.filter((item) => {
            const itemDate = new Date(item?.attributes?.order_date);
            const category = item?.attributes?.category?.data?.id;
            return (
                category !== 18 &&
                isAfter(
                    itemDate,
                    getFirstDayOfMonth(currentYear, currentMonth)
                ) &&
                isBefore(itemDate, getLastDayOfMonth(currentYear, currentMonth))
            );
        });
        const expensesSum =
            expenses
                ?.filter((item) => {
                    const itemDate = new Date(item?.attributes?.expense_date);
                    return (
                        isAfter(
                            itemDate,
                            getFirstDayOfMonth(currentYear, currentMonth)
                        ) &&
                        isBefore(
                            itemDate,
                            getLastDayOfMonth(currentYear, currentMonth)
                        )
                    );
                })
                ?.reduce((acc, el) => {
                    acc += el.attributes.amount;
                    return acc;
                }, 0) || 0;
        const sellingsSum =
            currentMonthOrders?.reduce((acc, el) => {
                const selling_price = delve(el, 'attributes.selling_price');
                acc += selling_price;
                return acc;
            }, 0) || 0;
        const netCostSum =
            currentMonthOrders?.reduce((acc, el) => {
                const net_cost = delve(el, 'attributes.net_cost');
                acc += net_cost;
                return acc;
            }, 0) || 0;
        monthsData.push({
            name: monthName,
            Ծախսեր: expensesSum,
            Շահույթ: sellingsSum,
            Ինքնարժեք: netCostSum,
            'Զուտ եկամուտ': sellingsSum - netCostSum - expensesSum,
        });

        if (currentMonth === 0) {
            currentYear--; // Decrement the year if the current month is January
            currentMonth = 11; // Set the current month to December
        } else {
            currentMonth--; // Move to the previous month
        }
    }

    return monthsData.reverse(); // Reverse the order to get past months first
}
