import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'vite/modulepreload-polyfill'
import {createHashRouter, RouterProvider} from "react-router-dom";
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
import Central from "./Central.jsx";

const router =  createHashRouter([
     {
      path: "/",
      element: <Central />,
     }, 
    //  {
    //   path: '/create_patient',
    //   element: <CreatePatientPage />
    //  },
    //  {
    //   path: "/edit_patient",
    //   element: <EditPatient />,
    //  }, 
    //  {
    //   path: "/logs_page",
    //   element: <LogsPage />
    //  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
