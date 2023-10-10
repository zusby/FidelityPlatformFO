
import Navbar from "@/components/Navbar"
import { OrderClient } from "./components/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderColumn } from "./columns";
import { format } from "date-fns"
import { formatter } from "@/lib/utils";
import Loading from "@/components/loadingPage";
const OrdersPage = () => {
    interface OrderItem {
        productID: string;
        orderID: string;
        id: string;
    }

    interface Order {
        id: string
        phone: string
        address: string
        isPaid: boolean
        orderItems: OrderItem[]
        totalPrice: string
        createdAt: string;
    }

    const params = useParams();

    const [loading, setLoading] = useState(false);
    const baseURL = "http://localhost:8080/api/v1/";

    const [formattedOrders, setFormattedOrders] = useState<OrderColumn[]>([]);



    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(baseURL + `order/${params.storeID}/all`);
                if (!response.ok) {
                    throw new Error("Error in API call");
                }
                const data = await response.json();


                const formattedOrders = await Promise.all(
                    data.map(async (item: Order) => {
                        const productsDetails = await Promise.all(
                            item.orderItems.map(async (orderItem: OrderItem) => {
                                const productsResponse = await fetch(
                                    baseURL + `product/${orderItem.productID}`
                                );
                                if (!productsResponse.ok) {
                                    throw new Error("Error in API call");
                                }
                                const productsData = await productsResponse.json();

                                return productsData;
                            })
                        );

                        const totalPrice: string = formatter.format(
                            productsDetails.reduce((total, product) => {
                                return total + Number(product.price);
                            }, 0)
                        );

                        return {
                            id: item.id,
                            isPaid: item.isPaid,
                            address: item.address,
                            phone: item.phone,
                            products: productsDetails.map((product) => product.name).join(", "),
                            totalPrice,
                            createdAt: format(new Date(item.createdAt), "dd/MM/yyyy"),
                        };
                    })
                );
                setFormattedOrders(formattedOrders);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.storeID]);





    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Navbar />

            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <OrderClient data={formattedOrders} />

                </div>
            </div>
        </>
    );

}

export default OrdersPage