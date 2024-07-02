import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import Patients from "../pages/patients/Patients";
import Doctors from "../pages/doctors/Doctors";
import Hospitals from "../pages/hospitals/Hospitals";
import Specializations from "../pages/specializations/Specializations";
import UpdatePatient from "../pages/patients/UpdatePatient";
import UpdateHospital from "../pages/hospitals/UpdateHospital";
import UpdateSpecialization from "../pages/specializations/UpdateSpecialization";
import UpdateDoctor from "../pages/doctors/UpdateDoctor";

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
        path: "/patients/:id",
        element: <UpdatePatient />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/doctors/:id",
        element: <UpdateDoctor />,
      },
      {
        path: "/hospitals",
        element: <Hospitals />,
      },
      {
        path: "/hospitals/:id",
        element: <UpdateHospital />,
      },
      {
        path: "/specializations",
        element: <Specializations />,
      },
      {
        path: "/specializations/:id",
        element: <UpdateSpecialization />,
      },
    ],
  },
]);
