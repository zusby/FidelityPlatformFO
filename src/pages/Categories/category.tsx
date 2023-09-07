import Navbar from "@/components/Navbar"
import { Auth } from "@/lib/FireBase";
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";
import { CategoryForm } from "./components/category-form";
import { useParams } from "react-router";



export const CategoryPage = () => {

    const params = useParams();
    const [user] = useAuthState(Auth);
    const [loading, setLoading] = useState(false);
    const baseURL = "http://localhost:8080/api/v1/";
    const [category, setCategory] = useState<Category | null>(null);
    const [billBoards, setBillBoards] = useState<BillBoard[]>([]);
    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(baseURL + `Category/${params.CategoryID}`)

                .then((res) => { if (res.ok) return res.json(); return null })
                .then((data) => {
                    setCategory(data);
                })
                .catch((error) => {
                    console.error("could not find Store:", error);
                    setCategory(null);
                })
                .finally(() => { setLoading(false); toast.dismiss(); if (category === undefined) setCategory(null) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.CategoryID]);


    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(baseURL + `billboard/${params.storeID}/all`)

                .then((res) => { if (res.ok) return res.json(); return null })
                .then((data) => setBillBoards(data))
                .finally(() => setLoading(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.storeID]);


   

    if (loading) {
        toast.loading("Retrieving data");
    } else
        return (
            <>
                <Toaster />
                <Navbar />
                <div className="flex-col">
                    <div className="flex-11 space-y-4 p-8 pt-6">

                        <CategoryForm initialData={category} billboards={billBoards} />

                    </div>
                </div>
            </>
        )
}