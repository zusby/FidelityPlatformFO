
import Navbar from "@/components/Navbar"
import { BillBoardClient } from "./components/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "@/lib/FireBase";
import { BillBoardColumn } from "./columns";
import { format } from "date-fns"
import Loading from "@/components/loadingPage";
const BillBoardsPage = () => {


    const params = useParams();
    const [user] = useAuthState(Auth);
    const [loading, setLoading] = useState(false);
    const baseURL = import.meta.env.VITE_BACKEND_URL;

    const [billBoards, setBillBoards] = useState<BillBoard[]>([]);


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


    const formattedBillboards: BillBoardColumn[] = billBoards
        .map((item) => ({
            id: item.id,
            label: item.label,
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
                    <BillBoardClient data={formattedBillboards} />

                </div>
            </div>
        </>
    );

}

export default BillBoardsPage