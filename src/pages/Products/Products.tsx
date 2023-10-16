import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { ProductColumn } from "./columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { ProductClient } from "./components/client";
import { useParams } from "react-router-dom";
import Loading from "@/components/loadingPage";

export const ProductsPage = () => {
    const params = useParams();
    const baseURL = import.meta.env.VITE_BACKEND_URL;


    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            try {
                const productsResponse = await fetch(baseURL + `product/${params.storeID}/all`);
                if (!productsResponse.ok) {
                    throw new Error('Error in API call');
                }
                const productsData = await productsResponse.json();


                const productPromises = productsData.map(async (item: Product) => {
                    const [colorData, categoryData, sizeData] = await Promise.all([
                        getColor(item.colorID),
                        getCategory(item.categoryID),
                        getSize(item.sizeID),
                    ]);

                    const formattedItem: ProductColumn = {
                        id: item.id,
                        name: item.name,
                        isFeatured: item.isFeatured !== undefined ? item.isFeatured : false,
                        isArchived: item.isArchived !== undefined ? item.isArchived : false,
                        price: formatter.format(item.price),
                        category: categoryData ? (categoryData as unknown as Category).name : 'N/A',
                        color: colorData ? (colorData as unknown as Color).value : 'N/A',
                        size: sizeData ? (sizeData as unknown as Size).name : 'N/A',
                        createdAt: format(new Date(item.createdAt), 'dd/MM/yyyy'),
                    };

                    return formattedItem;
                });

                const formattedData = await Promise.all(productPromises);
                setProducts(formattedData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        }


        fetchData();


    }, [params.storeID]);

    const getColor = async (colorID: string) => {
        const response = await fetch(baseURL + `color/${colorID}`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    }

    const getCategory = async (categoryID: string) => {
        const response = await fetch(baseURL + `category/${categoryID}`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    }

    const getSize = async (sizeID: string) => {
        const response = await fetch(baseURL + `size/${sizeID}`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <Navbar />
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    {/* Render your component with formattedProducts */}
                    <ProductClient data={products as unknown as ProductColumn[]} />
                </div>
            </div>
        </>
    );

};
