import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getAllPaidOrderItems, getArchivedProducts, getListedProducts, getTotalRevenue } from "@/actions/get-total-revenue";
import Navbar from "@/components/Navbar";
import { Overview } from "@/components/Overview";
import Loading from "@/components/loadingPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCard, EuroIcon, PackageCheck, PackageMinus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";



interface GraphData {
    name: string;
    total: number;
}

const DashBoardPage = () => {

    const { storeID } = useParams();


    const [loading, setLoading] = useState(false);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [sales, setSales] = useState(0);

    const [listedProducts, setListedProducts] = useState(0);
    const [archivedProducts, setArchivedProducts] = useState(0);
    const [graphData, setGraphData] = useState<GraphData[]>();


    useEffect(() => {
        async function fetchTotalRevenue() {
            setLoading(true);
            try {
                const revenue = await getTotalRevenue(storeID ?? "");
                setTotalRevenue(revenue);
                const orders = await getAllPaidOrderItems(storeID ?? "");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const ordersLength = orders.reduce((amount: number, order: any) => amount + (order?.orderItems.length || 0), 0);
                setSales(ordersLength);
                const products = await getListedProducts(storeID ?? "");
                setListedProducts(products.length);
                const archivedProducts = await getArchivedProducts(storeID ?? "");
                setArchivedProducts(archivedProducts.length)
                const graph = await getGraphRevenue(storeID ?? "");
                setGraphData(graph);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }

        fetchTotalRevenue();
    }, [storeID]);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Navbar />
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <Heading title="Dashboard" description="Overview of your store" />
                    <Separator />
                    <div className="grid gap-4 grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total revenue
                                </CardTitle>

                                <EuroIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatter.format(totalRevenue)}
                                </div>
                            </CardContent>

                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Products sold
                                </CardTitle>

                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    +{sales}
                                </div>
                            </CardContent>

                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Products on Sale
                                </CardTitle>

                                <PackageCheck className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {listedProducts}
                                </div>
                            </CardContent>

                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Archived Products
                                </CardTitle>

                                <PackageMinus className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {archivedProducts}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview data={graphData ?? []} />

                        </CardContent>

                    </Card>



                </div>
            </div>
        </>)
}
export default DashBoardPage;