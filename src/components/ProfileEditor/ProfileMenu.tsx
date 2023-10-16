import { useState, useEffect } from 'react';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "../ui/menubar";
import { Auth } from "@/lib/FireBase";
import { ClipLoader } from "react-spinners";
import ProfileForm from './profile-editor';
import { Button } from '../ui/button';







const Profilenavbar = () => {
  const [userData, setUserData] = useState<UserProfile | null>();
  const user = Auth.currentUser;
  const [isOpen, setIsOpen] = useState(false);
  const base_url = import.meta.env.VITE_BACKEND_URL;



  useEffect(() => {
    async function getUserProfile(userID: string) {
      const result = await fetch(base_url + `customer/${userID}`)
        .then((response) => response.json())
        .catch((error) => console.log(error));
      return result;
    }

    if (user) {
      getUserProfile(user?.uid).then((res) => {
        setUserData(res);
      });
    }
  }, [base_url, user]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  function handleLogOut() {
    Auth.signOut();
  }



  if (userData)
    return (
      <div >
        <Menubar >
          <MenubarMenu>
            <MenubarTrigger asChild >
              <Button variant="outline" className='w-full h-full fill-current cursor-pointer border-transparent ' >
                {userData?.name || <ClipLoader size={15} />}
              </Button>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={openModal}>
                Manage profile
              </MenubarItem>
              <MenubarItem disabled>Billing</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={handleLogOut}>Log out</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <ProfileForm isOpen={isOpen} user={userData} onClose={closeModal} />
      </div>
    );
};

export default Profilenavbar;
