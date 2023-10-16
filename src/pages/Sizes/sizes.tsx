
import Navbar from "@/components/Navbar"

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "@/lib/FireBase";

import { format } from "date-fns"
import { SizeColumn } from "./columns";
import { SizesClient } from "./components/client";
import Loading from "@/components/loadingPage";
const SizesPage = () => {


    const params = useParams();
    const [user] = useAuthState(Auth);
    const [loading, setLoading] = useState(false);
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    const [sizes, setSizes] = useState<Size[]>([]);


    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(baseURL + `size/${params.storeID}/all`)

                .then((res) => { if (res.ok) return res.json(); return null })
                .then((data) => setSizes(data))
                .finally(() => setLoading(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.storeID]);


    const formattedSizes: SizeColumn[] = sizes
        .map((item) => ({
            id: item.id,
            name: item.name,
            value: item.value,
            createdAt: format(new Date(item.createdAt), 'dd/MM/yyyy'),
        }))

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Navbar />

            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <SizesClient data={formattedSizes} />

                </div>
            </div>
        </>
    );

}

export default SizesPage