import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import App from './App';
import LoginPage from './components/Auth/LoginPage';
import SetupLayout from './pages/DashBoard/setupLayout';
import DashBoardLayout from './pages/DashBoard/Layout';
import DashBoardPage from './pages/DashBoard/dashboard-page';
import Protected from './components/Auth/Protected';
import ErrorPage from './pages/ErrorPage';
import SettingsPage from './pages/DashBoard/settings-page';



const router = createBrowserRouter([

  {
    path: "/",
    element: (
    <Protected><SetupLayout children={<App />}/></Protected>),
    errorElement:<ErrorPage/>,
      
  },
  {
    
  },
  {

    path: "sign-in",
    element: <LoginPage />,
  },
  {

    path: "sign-up",
    element: <LoginPage />
  },
  {
    path:':storeID',
    element: (
      <Protected>
    <DashBoardLayout children={<DashBoardPage/>}/>
    </Protected>
    ),
  },
  {
    path: ":storeID/settings",
    element: (
    <Protected>
        <SettingsPage/>
      </Protected>)
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>,
)
