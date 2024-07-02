import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useGetAllHospitals from "../../hooks/useGetAllHospitals";
import useGetAllSpecializations from "../../hooks/useGetAllSpecializations";
import AllDoctors from "./AllDoctors";
import useGetAllDoctors from "../../hooks/useGetAllDoctors";

const Doctors = () => {
  const { hospitals } = useGetAllHospitals();
  const { specializations } = useGetAllSpecializations();
  const { refetchDoctors } = useGetAllDoctors();

  const addNewDoctor = useMutation({
    mutationFn: (newDoctor) => {
      return axios.post(
        "https://hospital-server-seven.vercel.app/api/v1/doctors/create-doctor",
        newDoctor
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const doctor = Object.fromEntries(formData);

    addNewDoctor.mutate(
      { doctor },
      {
        onSuccess: async (result) => {
          if (result?.data?.success) {
            await refetchDoctors();
            alert("Doctor info saved!");
          }
        },
      }
    );
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">Add Doctor Details</h1>
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
          <label htmlFor="email">Email:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="tel"
            name="phoneNo"
            id="phoneNo"
          />
        </div>

        <div className="grid grid-cols-3 items-center">
          <label htmlFor="hospital">Hospital:</label>
          <select
            className="border col-span-2 px-2 py-1"
            name="hospital"
            id="hospital"
            required
          >
            <option></option>
            {hospitals?.map((hospital) => (
              <option key={hospital._id} value={hospital._id}>
                {hospital.hospitalName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 items-center pb-3">
          <label htmlFor="specialization">Specialized At:</label>
          <select
            className="border col-span-2 px-2 py-1"
            name="specialization"
            id="specialization"
            required
          >
            <option></option>
            {specializations?.map((specialization) => (
              <option key={specialization._id} value={specialization._id}>
                {specialization.specialization}
              </option>
            ))}
          </select>
        </div>

        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          type="submit"
        >
          Add Doctor
        </button>
      </form>

      <AllDoctors />
    </div>
  );
};

export default Doctors;
