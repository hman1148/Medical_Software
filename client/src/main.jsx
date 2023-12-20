import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'vite/modulepreload-polyfill'
import {createHashRouter, RouterProvider} from "react-router-dom";
import Central from "./Central.jsx";
import CreatePatientPage from './CreatePatientPage.jsx';
import Patient from './Patient.jsx';
import EditPatient from './EditPatient.jsx';
import Logs from './Logs.jsx';

const router =  createHashRouter([
     {
      path: "/",
      element: <Central />,
     }, 
     {
      path: '/central/create_patient_page',
      element: <CreatePatientPage />
     },
     {
      path: "/edit_patient/:id",
      element: <EditPatient />,
     }, 
     {
      path: "/patient/:id",
      element: <Patient />
     },
     {
      path: '/central/logs',
      element: <Logs />
     }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
