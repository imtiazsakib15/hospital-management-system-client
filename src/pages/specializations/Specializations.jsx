import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Specializations = () => {
  const mutation = useMutation({
    mutationFn: (newSpecialization) => {
      return axios.post(
        "https://hospital-server-seven.vercel.app/api/v1/specializations/create-specialization",
        newSpecialization
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const specialization = Object.fromEntries(formData);

    mutation.mutate({ specialization });
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">
        Add Specialization Details
      </h1>
      <form onSubmit={handleSubmit} className="w-96 mx-auto py-6 space-y-3">
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="specialization">Specialization:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="specialization"
            id="specialization"
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          type="submit"
        >
          Add Specialization
        </button>
      </form>
    </div>
  );
};

export default Specializations;
