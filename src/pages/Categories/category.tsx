import Navbar from "@/components/Navbar"
import { Auth } from "@/lib/FireBase";
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { CategoryForm } from "./components/category-form";
import { useParams } from "react-router";
import Loading from "@/components/loadingPage";



export const CategoryPage = () => {

    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<Category | null>(null);
    const params = useParams();
    const baseURL = "http://localhost:8080/api/v1/";
    const [user] = useAuthState(Auth);
    const [billBoards, setBillBoards] = useState<BillBoard[]>([]);

    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(baseURL + `category/${params.categoryID}`)

                .then((res) => { if (res.ok) return res.json(); return null })
                .then((data) => {
                    setCategory(data);
                })
                .catch((error) => {
                    console.error("could not find Store:", error);
                    setCategory(null);
                })
                .finally(() => setLoading(false));
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
        return <Loading />
    }

    return (
        <>

            <Navbar />
            <div className="flex-col">
                <div className="flex-11 space-y-4 p-8 pt-6">

                    <CategoryForm initialData={category} billboards={billBoards} />

                </div>
            </div>
        </>
    )

}
