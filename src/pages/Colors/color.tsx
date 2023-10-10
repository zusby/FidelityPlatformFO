import Navbar from "@/components/Navbar"
import { Auth } from "@/lib/FireBase";
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { ColorForm } from "./components/color-form";
import { useParams } from "react-router";
import Loading from "@/components/loadingPage";



export const ColorPage = () => {

    const params = useParams();
    const [user] = useAuthState(Auth);
    const [loading, setLoading] = useState(false);
    const baseURL = "http://localhost:8080/api/v1/";
    const [color, setColor] = useState<Size | null>(null);

    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(baseURL + `color/${params.colorID}`)

                .then((res) => { if (res.ok) return res.json(); return null })
                .then((data) => {
                    setColor(data);
                })
                .catch((error) => {
                    console.error("could not find color:", error);
                    setColor(null);
                })
                .finally(() => setLoading(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.sizeID]);






    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Navbar />
            <div className="flex-col">
                <div className="flex-11 space-y-4 p-8 pt-6">
                    <ColorForm initialData={color} />
                </div>
            </div>
        </>
    )

}
