import { getAllPaidOrderItems, getProduct } from "./get-total-revenue";
interface Order {
    id: string
    phone: string
    address: string
    isPaid: boolean
    orderItems: OrderItem[]
    totalPrice: string
    createdAt: string;
}
interface OrderItem {
    productID: string;
    orderID: string;
    id: string;
}

interface GraphData {
    name: string;
    total: number;
}


export const getGraphRevenue = async (storeID: string) => {
    const orders = await getAllPaidOrderItems(storeID);

    const getProductByID = async (productID: string) => {
        return await getProduct(productID);
    };


    const updatedOrders = await Promise.all(
        orders.map(async (order: Order) => {
            const updatedOrderItems = [];
            for (const item of order.orderItems) {
                const product = await getProductByID(item.productID);
                updatedOrderItems.push(product);
            }
            return { ...order, orderItems: updatedOrderItems };
        })
    );



    const monthlyRevenue: { [key: number]: number } = {};

    for (const order of updatedOrders) {
        const month = new Date(order.createdAt).getMonth();
        let revenueForOrder = 0;
        for (const item of order.orderItems) {
            revenueForOrder += item.price;
        }
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;

    }
    const graphData: GraphData[] = [
        { name: "Jan", total: 0 },
        { name: "Feb", total: 0 },
        { name: "Mar", total: 0 },
        { name: "Apr", total: 0 },
        { name: "May", total: 0 },
        { name: "Jun", total: 0 },
        { name: "Jul", total: 0 },
        { name: "Aug", total: 0 },
        { name: "Sep", total: 0 },
        { name: "Oct", total: 0 },
        { name: "Nov", total: 0 },
        { name: "Dec", total: 0 },
    ];

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    return graphData;


}