import React, { lazy } from "react";
import { createBrowserRouter } from "react-router";
// import Home from "../Pages/Home";
// import Apps from "../Pages/Apps";
import MainLayouts from "../Layouts/MainLayouts";
import ErrorPage from "../Pages/ErrorPage";

import LoadingSpinner from "../Components/LoadingSpinner";
import Installation from "../Pages/Installaition";


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Home = lazy(async () => {
    await delay(700); 
    return import("../Pages/Home");
});

const Apps = lazy(async () => {
    await delay(500); 
    return import("../Pages/Apps");
});



const AppsDetails = lazy(async () => {
    await delay(700); 
    return import("../Pages/AppsDetails");
});



// Fallback Spinner JSX
const SuspenseFallback = (
    <div className="flex justify-center items-center min-h-[80vh]">
        <LoadingSpinner />
    </div>
);

const router = createBrowserRouter([

  {
    path: '/',
    element: <MainLayouts/>,
    errorElement: <ErrorPage/>,
    hydrateFallbackElement: <p>Loading...</p>,
    children: [

  {
    index: true,
    element: <React.Suspense fallback={SuspenseFallback}><Home/></React.Suspense>,
    loader:()=> fetch('./AppsData.json'),
  },
  {
    path: '/apps',
    element: <React.Suspense fallback={SuspenseFallback}><Apps/></React.Suspense>,
  },
  {
    path: '/installation',
    element: <React.Suspense fallback={SuspenseFallback}><Installation/></React.Suspense>,
  },
  {
    path: '/apps/:id',
    element: <React.Suspense fallback={SuspenseFallback}><AppsDetails/></React.Suspense>,
  },

    ]
  },



])
// console.log(router)

export default router