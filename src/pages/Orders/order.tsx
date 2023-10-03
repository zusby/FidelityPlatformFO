import Navbar from "@/components/Navbar"
import { Auth } from "@/lib/FireBase";
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";
import { BillBoardForm } from "./components/order-form";
import { useParams } from "react-router";



export const BillBoardPage = () => {

    const params = useParams();
    const [user] = useAuthState(Auth);
    const [loading, setLoading] = useState(false);
    const baseURL = "http://localhost:8080/api/v1/";
    const [billBoard, setBillBoard] = useState<BillBoard | null>(null);

    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(baseURL + `billboard/${params.billboardID}`)

                .then((res) => { if (res.ok) return res.json(); return null })
                .then((data) => {
                    setBillBoard(data);
                })
                .catch((error) => {
                    console.error("could not find Store:", error);
                    setBillBoard(null);
                })
                .finally(() => { setLoading(false); toast.dismiss(); if (billBoard === undefined) setBillBoard(null) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.billBoardID]);


   

    if (loading) {
        toast.loading("Retrieving data");
    } else
        return (
            <>
                <Toaster />
                <Navbar />
                <div className="flex-col">
                    <div className="flex-11 space-y-4 p-8 pt-6">

                        <BillBoardForm initialData={billBoard} />

                    </div>
                </div>
            </>
        )
}