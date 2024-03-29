import Navbar from "@/components/Navbar"
import { useEffect, useState } from "react"
import { SizeForm } from "./components/size-form";
import { useParams } from "react-router";
import Loading from "@/components/loadingPage";



export const SizePage = () => {

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    const [size, setSize] = useState<Size | null>(null);

    useEffect(() => {


        if (params.sizeID !== "new") {
            setLoading(true);
            fetch(baseURL + `size/${params.sizeID}`)
                .then((res) => { if (res.ok) return res.json(); return null })
                .then((data) => {
                    setSize(data);
                })
                .catch(() => {
                    setSize(null);
                })
                .finally(() => setLoading(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.sizeID]);






    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Navbar />
            <div className="flex-col">
                <div className="flex-11 space-y-4 p-8 pt-6">
                    <SizeForm initialData={size} />
                </div>
            </div>
        </>
    )

}
