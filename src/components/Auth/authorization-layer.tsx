import { ReactNode, useEffect, useState } from "react"
import { useParams } from "react-router"
import Loading from "../loadingPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "@/lib/FireBase";
import ErrorPage from "@/pages/ErrorPage";
interface Store {
    id: string;
    vatNumber: string;
    name: string;
    shopOwners: string[];
    prizes?: {
        awards: [];
    };
    space: {
        description: string;
        shopTelephoneNumber: string;
        shopAddress: {
            street: string;
            zipCode: string;
            city: string;
            province: string;
        };
        email: string;
    };
    catalogue?: {
        catalogue?: [];
    };
    employees?: string[];
}


interface isAutorized {
    children: ReactNode
}
const Authorization: React.FC<isAutorized> = ({
    children
}) => {
    const [user, loading] = useAuthState(Auth);
    const [loadingStore, setLoadingStore] = useState(false);
    const [store, setStore] = useState<Store>();
    const { storeID } = useParams();
    const base_url = import.meta.env.VITE_BACKEND_URL;





    useEffect(() => {
        async function getStore(storeID: string) {
            setLoadingStore(true);
            const res = fetch(base_url + `shop/${storeID}`)
                .then((res) => res.json()).finally(() => setLoadingStore(false))
            return res;
        }
        async function fetchStore() {
            const store = await getStore(storeID ?? "");
            setStore(store);
        }
        fetchStore();
    }, [base_url, storeID])

    if (loadingStore || loading) {
        return <Loading />
    }

    if (storeID) {

        if (user && store) {
            if (store.shopOwners.includes(user.uid)) {
                return <>{children}</>
            }
        }
    }

    return (
        <>
            <ErrorPage errorTitle={"Whoops!"} errorMessage={"Could not find the store you were looking for"} />
        </>
    )
}

export default Authorization;