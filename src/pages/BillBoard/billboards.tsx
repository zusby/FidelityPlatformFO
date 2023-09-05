
import Navbar from "@/components/Navbar"
import { BillBoardClient } from "./components/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "@/lib/FireBase";

const BillBoardsPage = () => {


    const params = useParams();
    const [user] = useAuthState(Auth);
    const [loading, setLoading] = useState(false);
    const baseURL = "http://localhost:8080/api/v1/";

    const [billBoards, setBillBoards] = useState([]);


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

    if (!loading) {
        console.log(billBoards);
        return (
            <>
                <Navbar />

                <div className="flex-col">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <BillBoardClient data={billBoards} />

                    </div>
                </div>
            </>
        );
    }
}

export default BillBoardsPage