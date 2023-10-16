import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SettingsForm } from "./components/SettingsForm";
import Navbar from "@/components/Navbar";
import Loading from "@/components/loadingPage";



const SettingsPage = () => {

  const { storeID } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const base_url = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    async function getStores(storeID: string) {
      const result = await fetch(base_url + `shop/${storeID}`)
        .then((response) => response.json())
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
      return result;
    }

    getStores(storeID ?? "").then((res) => {
      setStore(res);
    });
  }, [base_url, storeID]);


  if (loading) {
    return <Loading />
  }
  if (store)
    return (
      <>
        <Navbar />
        <div className="flex-col">
          <div className=" flex-1 space-y-4 p-8 pt-6">
            <SettingsForm initialData={store} />
          </div>
        </div>
      </>
    );
}
export default SettingsPage;