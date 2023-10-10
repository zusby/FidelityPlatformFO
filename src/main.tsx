import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import App from './App';
import LoginPage from './components/Auth/LoginPage';
import SetupLayout from './pages/DashBoard/setupLayout';
import DashBoardLayout from './pages/DashBoard/Layout';
import Protected from './components/Auth/Protected';
import ErrorPage from './pages/ErrorPage';
import SettingsPage from './pages/DashBoard/settings-page';
import BillBoardsPage from './pages/BillBoard/billboards';
import { BillBoardPage } from './pages/BillBoard/billboard';
import CategoriesPage from './pages/Categories/categories';
import { CategoryPage } from './pages/Categories/category';
import SizesPage from './pages/Sizes/sizes';
import { SizePage } from './pages/Sizes/size';
import ColorsPage from './pages/Colors/colors';
import { ColorPage } from './pages/Colors/color';
import { ProductsPage } from './pages/Products/Products';
import { ProductPage } from './pages/Products/Product';
import { ThemeProvider } from './dark-mone';
import OrdersPage from './pages/Orders/orders';
import Authorization from './components/Auth/authorization-layer';



const router = createBrowserRouter([
  //HOME
  {
    path: "/",
    element: (
      <Protected>
        <SetupLayout children={<App />} />
      </Protected>),
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
        <Authorization>
        <DashBoardLayout />
        </Authorization>
      </Protected>
    ),
  },
  {
    path: ":storeID/settings",
    element: (
      <Protected>
        <Authorization>
          <SettingsPage />
        </Authorization>
      </Protected>)
  },
  {
    path: ":storeID/billboards",
    element: (
      <Protected>
        <Authorization>
          <BillBoardsPage />
        </Authorization>
      </Protected>
    )
  },
  {
    path: ":storeID/billboards/:billboardID",
    element: (
      <Protected>
        <Authorization>
          <BillBoardPage />
        </Authorization>
      </Protected>
    )
  },
  {
    path: ":storeID/category",
    element: (
      <Protected>
        <Authorization>
         <CategoriesPage />
        </Authorization>
      </Protected>
    )
  },
  {
    path: ":storeID/category/:categoryID",
    element: (
      <Protected>
        <Authorization>
          <CategoryPage />
        </Authorization>
      </Protected>
    )
  },
  {
    path: ":storeID/sizes",
    element: (
      <Protected>
        <Authorization>
        <SizesPage />
        </Authorization>
      </Protected>
    )
  },
  {
    path: ":storeID/sizes/:sizeID",
    element: (
      <Protected>
        <Authorization>
        <SizePage />
        </Authorization>
      </Protected>
    )
  },
  {
    path: ":storeID/colors",
    element: (
      <Protected>
        <Authorization>
          <ColorsPage />
        </Authorization>
      </Protected>
    )
  },
  {
    path: ":storeID/colors/:colorID",
    element: (
      <Protected>
        <Authorization>
        <ColorPage />
        </Authorization>
      </Protected>
    )
  },
  {
    path: ":storeID/products",
    element: (
      <Protected>
        <Authorization>
        <ProductsPage />
        </Authorization>
      </Protected>
    )
  },
  {
    path: ":storeID/products/:productID",
    element: (
      <Protected>
        <Authorization>
          <ProductPage />
        </Authorization>
      </Protected>
    )
  },
  {
    path: ":storeID/orders",
    element: (
      <Protected>
        <Authorization>
        <OrdersPage />
        </Authorization>
      </Protected>
    )
  },
  {
    path: ":storeID/orders/:productID",
    element: (
      <Protected>
        <Authorization>
          <ProductPage />
        </Authorization>
      </Protected>
    )
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='light' storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
