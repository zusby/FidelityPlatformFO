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
import BillBoardsPage from './pages/BillBoard/billboards';
import { BillBoardPage } from './pages/BillBoard/billboard';
import CategoriesPage from './pages/Categories/categories';
import { CategoryPage } from './pages/Categories/category';



const router = createBrowserRouter([
  //HOME
  {
    path: "/",
    element: (
      <Protected><SetupLayout children={<App />} /></Protected>),
    errorElement: <ErrorPage errorTitle='Page not found' errorMessage='The page you were looking for doesnt exist or got moved' />,

  },
  //login routes
  {
    path: "sign-in",
    element: <LoginPage />,
  },
  {

    path: "sign-up",
    element: <LoginPage />
  },
  //Store routes
  {
    path: ':storeID',
    element: (
      <Protected>
        <DashBoardLayout children={<DashBoardPage />} />
      </Protected>
    ),
  },
  {
    path: ":storeID/settings",
    element: (
      <Protected>
        <SettingsPage />
      </Protected>)
  },
  {
    path: ":storeID/billboards",
    element: (
      <Protected>
        <BillBoardsPage />
      </Protected>
    )
  },
  {
    path: ":storeID/billboards/:billboardID",
    element: (
      <Protected>
        <BillBoardPage />
      </Protected>
    )
  },
  {
    path: ":storeID/category",
    element: (
      <Protected>
        <CategoriesPage/>
      </Protected>
    )
  },
  {
    path: ":storeID/category/:categoryID",
    element: (
      <Protected>
        <CategoryPage/>
      </Protected>
    )
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>,
)
