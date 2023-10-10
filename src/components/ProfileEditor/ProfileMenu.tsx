import { useState, useEffect } from 'react';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "../ui/menubar";
import { Auth } from "@/lib/FireBase";

async function getUserProfile(userID: string) {
  const result = await fetch(`http://localhost:8080/api/v1/customer/${userID}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return result;
}

const Profilenavbar = () => {
  const [userData, setUserData] = useState<UserProfile | null>();
  const user = Auth.currentUser;

  useEffect(() => {
    if (user) {
      getUserProfile(user?.uid).then((res) => {
        setUserData(res); // Update user data state once the API call is completed
      });
    }
  }, [user]);

  function handleLogOut() {
    Auth.signOut();
  }


  return (
    <div className="rounded-full">
      <Menubar className="rounded-full text-slate-900">
        <MenubarMenu>
          <MenubarTrigger>{userData?.name || 'Loading...'}</MenubarTrigger>

          <MenubarContent>
            <MenubarItem>
              tab1
            </MenubarItem>
            <MenubarItem>tab2</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>tab3</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={handleLogOut}>Log out</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Profilenavbar;
