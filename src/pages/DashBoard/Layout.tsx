import { Auth } from "@/lib/FireBase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthState } from 'react-firebase-hooks/auth'
import ErrorPage from "../ErrorPage";
import Loading from "@/components/loadingPage";
import DashBoardPage from "./dashboard-page";


// ... (import statements)

export default function DashBoardLayout() {
    const [store, setStore] = useState<Store | null>(null); // Initialize with null
    const [loading, setLoading] = useState(false);
    const { storeID } = useParams();
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [user] = useAuthState(Auth);

    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(baseURL + `shop/${storeID}`)
                .then((res) => res.json())
                .then((data) => {
                    setStore(data);
                })
                .catch((error) => {
                    console.error("could not find Store:", error);
                })
                .finally(() => setLoading(false));
        }
    }, [baseURL, storeID, user]);


    if (!user) {
        navigate("/sign-in");
        return null;
    }
    if (!store) {
        if (loading) {
            return <Loading />
        }
        else
            return <ErrorPage errorTitle={"Store not found"} errorMessage={"The store you were looking for doesnt exist or got moved"} />
    }
    if (store) {
        if (!store.shopOwners.includes(user.uid))
            return <ErrorPage errorTitle={"Store not found"} errorMessage={"The store you were looking for doesnt exist or got moved"} />
    }
    return (
        <>

            <DashBoardPage />
        </>
    );
}
