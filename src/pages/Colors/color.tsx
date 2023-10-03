import Navbar from "@/components/Navbar"
import { Auth } from "@/lib/FireBase";
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { ColorForm } from "./components/color-form";
import { useParams } from "react-router";



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
        return (
            <>
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    <span className="mt-4 text-slate-900 font-sans"><strong>Loading...</strong></span>
                </div>
            </>
        );
    } else {
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
}
