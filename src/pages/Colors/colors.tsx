
import Navbar from "@/components/Navbar"

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "@/lib/FireBase";

import { format } from "date-fns"
import { ColorColumn } from "./columns";
import { ColorsClient } from "./components/client";
const ColorsPage = () => {


    const params = useParams();
    const [user] = useAuthState(Auth);
    const [loading, setLoading] = useState(false);
    const baseURL = "http://localhost:8080/api/v1/";

    const [colors, setColors] = useState<Color[]>([]);


    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(baseURL + `color/${params.storeID}/all`)

                .then((res) => { if (res.ok) return res.json(); return null })
                .then((data) => setColors(data))
                .finally(() => setLoading(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.storeID]);


    const formattedSizes: ColorColumn[] = colors
        .map((item) => ({
            id: item.id,
            name: item.name,
            value: item.value,
            createdAt: format(new Date(item.createdAt), 'dd/MM/yyyy'),
        }))


    if (!loading) {

        return (
            <>
                <Navbar />

                <div className="flex-col">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <ColorsClient data={formattedSizes} />

                    </div>
                </div>
            </>
        );
    }
}

export default ColorsPage