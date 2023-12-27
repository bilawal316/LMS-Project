import React from 'react'
import ReactDOM from 'react-dom/client'
import Auth_Layout from "./components/layout/auth_layout";
import Instructor_layout from "./components/layout/instructor_layout";
import Onboarding from './components/auth/onboarding';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'

import Trainee_layout from './components/layout/trainee_layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth_Layout />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/instructor",
    element: <Instructor_layout />,
  },
  {
    path: "/trainee",
    element: <Trainee_layout/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)