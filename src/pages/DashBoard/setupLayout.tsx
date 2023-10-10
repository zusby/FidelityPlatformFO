import React, { useEffect, useState } from "react";
import { Auth } from "@/lib/FireBase";
import { useNavigate } from "react-router";
import Loading from "@/components/loadingPage";


export default function SetupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const baseURL = "http://localhost:8080/api/v1/";
    const user = Auth.currentUser; // Get the current user
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        if (user) {
            const userID = user.uid;

            fetch(baseURL + `shop/${userID}/shops`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.length < 1) {
                        data = null;
                        return;
                    } else {
                        const store = data.find((store: any) => store.id !== null);
                        setLoading(false);
                        window.location.assign(`${store.id}`);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error fetching data:", error);
                }).finally(() => setLoading(false));
        }
    }, [navigate, user]);
    if (loading) {
        return <Loading />
    } else
        return (
            <>
                {children}

            </>
        );
}
