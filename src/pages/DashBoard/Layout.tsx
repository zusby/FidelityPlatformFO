import { Auth } from "@/lib/FireBase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthState } from 'react-firebase-hooks/auth'
import ErrorPage from "../ErrorPage";
import Navbar from "../../components/Navbar";
import { Progress } from "@/components/ui/progress";


// ... (import statements)

export default function DashBoardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [store, setStore] = useState<Store | null>(null); // Initialize with null
    const [loading, setLoading] = useState(false);
    const { storeID } = useParams();
    const baseURL = "http://localhost:8080/api/v1/";
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
                .finally(()=>setLoading(false));
        }
    }, [storeID, user]);


    if (!user) {
        navigate("/sign-in");
        return null;
    }

    if(!store){
        if(loading){
            const progressValue = loading ? 0 : 100;
            return (
                <div>
                    <Progress value={progressValue} max={100}>
                        <Progress style={{ height: '4px' }}>
                            <Progress style={{ backgroundColor: 'var(--accent)' }} />
                        </Progress>
                    </Progress>
                </div>
            )
                
        }
        else
        return <ErrorPage errorTitle={"Store not found"} errorMessage={"The store you were looking for doesnt exist or got moved"}  />
    }
    return (
        <>
            <Navbar/>
            {children}
        </>
    );
}
