import { Auth } from "@/lib/FireBase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthState } from 'react-firebase-hooks/auth'
import ErrorPage from "../ErrorPage";
import Navbar from "../../components/Navbar";


// ... (import statements)

export default function DashBoardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [store, setStore] = useState<Store | null>(null); // Initialize with null
    const { storeID } = useParams();
    const baseURL = "http://localhost:8080/api/v1/";
    const navigate = useNavigate();
    const [user] = useAuthState(Auth);

    useEffect(() => {
        if (user) {
            fetch(baseURL + `shop/${storeID}`)
                .then((res) => res.json())
                .then((data) => {
                    setStore(data);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    navigate("/")
                });
        }
    }, [storeID, user]);


    if (!user) {
        navigate("/sign-in");
        return null;
    }

    if(!store){
        return <ErrorPage/>

    }
    return (
        <>
            <Navbar/>
            {children}
        </>
    );
}
