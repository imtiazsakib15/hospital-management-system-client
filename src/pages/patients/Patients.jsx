import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useGetAllPatients from "../../hooks/useGetAllPatients";
import AllPatients from "./AllPatients";

const Patients = () => {
  const { refetchPatients } = useGetAllPatients();
  const addNewPatient = useMutation({
    mutationFn: (newPatient) => {
      return axios.post(
        "https://hospital-server-seven.vercel.app/api/v1/patients/create-patient",
        newPatient
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const patient = Object.fromEntries(formData);

    addNewPatient.mutate(
      { patient },
      {
        onSuccess: async (result) => {
          if (result?.data?.success) {
            await refetchPatients();
            e.target.reset();
            alert("Patient info saved!");
          }
        },
      }
    );
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">Add Patients Details</h1>
      <form onSubmit={handleSubmit} className="w-96 mx-auto py-6 space-y-3">
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="name">Name:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="address">Address:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="address"
            id="address"
          />
        </div>
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="email">Email:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="grid grid-cols-3 items-center pb-3">
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="tel"
            name="phoneNo"
            id="phoneNo"
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          type="submit"
        >
          Add Patient
        </button>
      </form>

      <AllPatients />
    </div>
  );
};

export default Patients;
