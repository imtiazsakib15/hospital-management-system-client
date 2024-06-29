import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import Patients from "../pages/patients/Patients";
import Doctors from "../pages/doctors/Doctors";
import Hospitals from "../pages/hospitals/Hospitals";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/patients",
        element: <Patients />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/hospitals",
        element: <Hospitals />,
      },
      {
        path: "/patients",
        element: <Patients />,
      },
    ],
  },
]);
