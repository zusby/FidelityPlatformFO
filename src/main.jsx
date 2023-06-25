import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import "./index.css";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import Contact from "./routes/contact.jsx";
import UsersList from "./routes/users-list.jsx";
import UserEditPage from "./user/UserEditPage.jsx";
import FidelityCard from "./user/FidelityCard.jsx";
import UserCoupons from "./user/UserCoupons.jsx";
import LoginPage from "./routes/LoginPage";
import UserPurchaseHistory from "./user/UserPurchaseHistory.jsx";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path: "contacts/:contactId",
                element: <Contact />,
            },
            {
                path: "users",
                element: <UsersList/>,
            },
            {
                path: "user/:userId",
                element: <UserEditPage/>
            },
            {
                path:"user/:userId/card",
                element: <FidelityCard/>
            },
            {
                path:"user/:userId/coupons",
                element: <UserCoupons/>
            },
            {
                path:"user/:userId/purchase-history",
                element:<UserPurchaseHistory/>
            }
        ]
    },
    {
    path:"/login",
    element:<LoginPage/>
    }
  
    
            
        
    


]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);