import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import App from './App';
import LoginPage from './components/Auth/LoginPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {

    path: "sign-in",
    element: <LoginPage />,
  },
  {

    path: "sign-up",
    element: <LoginPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>,
)
