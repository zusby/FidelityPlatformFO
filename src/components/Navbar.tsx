import Profilenavbar from "@/components/ProfileEditor/ProfileMenu";
import MainNav from "./MainNav";
import StoreSwitcher from "./store-switcher";
import { StoreModal } from "./Modals/store-modal";
import { Auth } from "@/lib/FireBase";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Navbar = () => {
  const userID = Auth.currentUser?.uid;
  const [stores, setStores] = useState<Store[] | null>(null);

  async function getStores(userID: string) {
    const result = await fetch(`http://localhost:8080/api/v1/shop/${userID}/shops`)
      .then((response) => response.json())
    return result;
  }


  useEffect(() => {
    if (userID) {
      getStores(userID).then((res) => {
        setStores(res); // Update user data state once the API call is completed
      });
    }
  }, [userID]);



  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Toaster />
          <StoreSwitcher items={stores || []} />
          <div>
            <MainNav className="mx-6  " />
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Profilenavbar />
            <StoreModal />
          </div>
        </div>
      </div>

    </div>
  );
}
export default Navbar;