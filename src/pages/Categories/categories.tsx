
import Navbar from "@/components/Navbar"

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns"
import { CategoryColumn } from "./columns";
import { CategoryClient } from "./components/client";
import Loading from "@/components/loadingPage";
const CategoriesPage = () => {


    const params = useParams();
    const [loading, setLoading] = useState(false);
    const baseURL = import.meta.env.VITE_BACKEND_URL;

    const [categories, setCategories] = useState<Category[]>([]);
    const [billboards, setBillboards] = useState<BillBoard[]>([]);

    useEffect(() => {
        try {
            setLoading(true);
            fetch(baseURL + `category/${params.storeID}/all`)

                .then((res) => { if (res.ok) return res.json(); return null })
                .then((data) => setCategories(data))
                .finally(() => setLoading(false))
        } catch (error) {
            console.log(error);
        }


    }, [baseURL, params.storeID]);

    useEffect(() => {
        try {
            setLoading(true);
            fetch(baseURL + `billboard/${params.storeID}/all`)

                .then((res) => { if (res.ok) return res.json(); return null })
                .then((data) => setBillboards(data))
                .finally(() => setLoading(false))
        } catch (error) {
            console.log(error);
        }

    }, [baseURL, params.storeID]);

    function getBillboard(category: Category) {
        const billboard = billboards.find((billboard) => billboard.id === category.billboardID);
        if (billboard) {
            return billboard;
        }

    }


    const formattedCategories: CategoryColumn[] = categories
        ? categories.map((item) => ({
            id: item.id,
            name: item.name,
            billboardLabel: getBillboard(item)?.label ?? "",
            createdAt: format(new Date(item.createdAt), 'dd/MM/yyyy'),
        }))
        : [];


    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Navbar />

            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <CategoryClient data={formattedCategories} />

                </div>
            </div>
        </>
    );

}

export default CategoriesPage