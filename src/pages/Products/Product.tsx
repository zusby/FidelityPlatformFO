import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { ProductForm } from "./components/product-form";
import { useParams } from "react-router";
import Loading from "@/components/loadingPage";

export const ProductPage = () => {
    const params = useParams();
    const baseURL = "http://localhost:8080/api/v1/";

    // State variables to track loading status of each API call
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);
    const [sizes, setSizes] = useState<Size[] | null>([]);
    const [colors, setColors] = useState<Color[] | null>([]);
    const [categories, setCategories] = useState<Category[] | null>([]);
    const [images, setImages] = useState<Image[] | null>([]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            try {
                const categoriesResponse = await fetch(baseURL + `category/${params.storeID}/all`);
                if (!categoriesResponse.ok) {
                    throw new Error("Could not find categories.");
                }
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData);

                const sizesResponse = await fetch(baseURL + `size/${params.storeID}/all`);
                if (!sizesResponse.ok) {
                    throw new Error("Could not find store sizes.");
                }
                const sizesData = await sizesResponse.json();
                setSizes(sizesData);

                const colorsResponse = await fetch(baseURL + `color/${params.storeID}/all`);
                if (!colorsResponse.ok) {
                    throw new Error("Could not find colors.");
                }
                const colorsData = await colorsResponse.json();
                setColors(colorsData);

                if (params.productID && params.productID !== "new") {
                    const productResponse = await fetch(baseURL + `product/${params.productID}`);
                    if (productResponse.ok) {
                        const productData = await productResponse.json();
                        setProduct(productData);
                        const imagesResponse = await fetch(baseURL + `image/${productData.id}/all`);
                        const imagesData = await imagesResponse.json();
                        setImages(imagesData);
                    }
                }

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [params.productID, params.storeID]);

    if (isLoading) {
        return <Loading />
    }
    return (
        <>

            <Navbar />
            <div className="flex-col">
                <div className="flex-11 space-y-4 p-8 pt-6">
                    <ProductForm
                        initialData={product}
                        categories={categories ? categories : []}
                        colors={colors ? colors : []}
                        sizes={sizes ? sizes : []}
                        images={images ? images : []}
                    />
                </div>
            </div>
        </>
    );

};
