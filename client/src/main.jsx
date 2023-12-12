import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'vite/modulepreload-polyfill'
import {createHashRouter, RouterProvider} from "react-router-dom";
import Central from "./Central.jsx";
import CreatePatientPage from './CreatePatientPage.jsx';

const router =  createHashRouter([
     {
      path: "/central",
      element: <Central />,
     }, 
     {
      path: '/create_patient_page',
      element: <CreatePatientPage />
     },
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
