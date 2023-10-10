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
        <DashBoardLayout />
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
        <CategoriesPage />
      </Protected>
    )
  },
  {
    path: ":storeID/category/:categoryID",
    element: (
      <Protected>
        <CategoryPage />
      </Protected>
    )
  },
  {
    path: ":storeID/sizes",
    element: (
      <Protected>
        <SizesPage />
      </Protected>
    )
  },
  {
    path: ":storeID/sizes/:sizeID",
    element: (
      <Protected>
        <SizePage />
      </Protected>
    )
  },
  {
    path: ":storeID/colors",
    element: (
      <Protected>
        <ColorsPage />
      </Protected>
    )
  },
  {
    path: ":storeID/colors/:colorID",
    element: (
      <Protected>
        <ColorPage />
      </Protected>
    )
  },
  {
    path: ":storeID/products",
    element: (
      <Protected>
        <ProductsPage />
      </Protected>
    )
  },
  {
    path: ":storeID/products/:productID",
    element: (
      <Protected>
        <ProductPage />
      </Protected>
    )
  },
  {
    path: ":storeID/orders",
    element: (
      <Protected>
        <OrdersPage />
      </Protected>
    )
  },
  {
    path: ":storeID/orders/:productID",
    element: (
      <Protected>
        <ProductPage />
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
