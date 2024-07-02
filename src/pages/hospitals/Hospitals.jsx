import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import AllHospitals from "./AllHospitals";
import useGetAllHospitals from "../../hooks/useGetAllHospitals";

const Hospitals = () => {
  const { refetchHospitals } = useGetAllHospitals();

  const addNewHospital = useMutation({
    mutationFn: (newHospital) => {
      return axios.post(
        "https://hospital-server-seven.vercel.app/api/v1/hospitals/create-hospital",
        newHospital
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const hospital = Object.fromEntries(formData);

    addNewHospital.mutate(
      { hospital },
      {
        onSuccess: async (result) => {
          if (result?.data?.success) {
            await refetchHospitals();
            e.target.reset();
            alert("Hospital info saved!");
          }
        },
      }
    );
  };
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">Add Hospital Details</h1>
      <form onSubmit={handleSubmit} className="w-96 mx-auto py-6 space-y-3">
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="hospitalName">Hospital Name:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="hospitalName"
            id="hospitalName"
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
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          type="submit"
        >
          Add Hospital
        </button>
      </form>

      <AllHospitals />
    </div>
  );
};

export default Hospitals;
