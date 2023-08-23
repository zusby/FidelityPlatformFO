import React, { useEffect } from "react";
import { Auth } from "@/lib/FireBase";
import { useNavigate } from "react-router";

export default function SetupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const baseURL = "http://localhost:8080/api/v1/";
    const user = Auth.currentUser; // Get the current user
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            const userID = user.uid;
            
            fetch(baseURL + `shop/${userID}/shops`)
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                       const store = data.find((store:any)=>store.id!==null);
                       window.location.assign(`${store.id}`);

                    }
                })
                .catch((error) => {
                    navigate("/");
                    
                    console.error("Error fetching data:", error);
                });
        }
    }, [user]);

    return <>{children}</>;
}
