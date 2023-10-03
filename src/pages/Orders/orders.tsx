
import Navbar from "@/components/Navbar"
import { OrderClient } from "./components/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "@/lib/FireBase";
import { OrderColumn } from "./columns";
import { format } from "date-fns"
import { formatter } from "@/lib/utils";
const OrdersPage = async () => {


    const params = useParams();
    const [user] = useAuthState(Auth);
    const [loading, setLoading] = useState(false);
    const baseURL = "http://localhost:8080/api/v1/";

    const [orders, setOrders] = useState<Order[]>([]);




    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(baseURL + `order/${params.storeID}/all`)

                .then((res) => { if (res.ok) return res.json(); return null })
                .then((data) => setOrders(data))
                .finally(() => setLoading(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.storeID]);


    const formattedOrders: OrderColumn[] = await Promise.all(
        orders.map(async (item) => {
            // Ottieni i dettagli dei prodotti associati agli ID dei prodotti in item.orderItems
            const productsDetails = await Promise.all(
                item.orderItems.map(async (orderItem) => {
                    const productsResponse = await fetch(baseURL + `order/${orderItem.productID}/`);
                    if (!productsResponse.ok) {
                        throw new Error('Error in API call');
                    }
                    const productsData = await productsResponse.json();
                    return productsData;
                })
            );

            // Calcola la somma dei prezzi dei prodotti
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
                products: productsDetails.map((product) => product.name).join(', '),
                totalPrice,
                createdAt: format(new Date(item.createdAt), 'dd/MM/yyyy'),
            };
        })
    );



    if (!loading) {

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
}

export default OrdersPage