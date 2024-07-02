import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useGetAllHospitals from "../../hooks/useGetAllHospitals";

const UpdateHospital = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refetchHospitals } = useGetAllHospitals();

  const { data: hospitalQuery, refetch: refetchSingleHospital } = useQuery({
    queryKey: ["singleHospital"],
    queryFn: async () =>
      await axios.get(
        `https://hospital-server-seven.vercel.app/api/v1/hospitals/${id}`
      ),
  });
  const updateHospital = useMutation({
    mutationFn: (updateHospital) => {
      return axios.patch(
        `https://hospital-server-seven.vercel.app/api/v1/hospitals/${id}`,
        updateHospital
      );
    },
  });

  const hospital = hospitalQuery?.data?.data;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const hospital = Object.fromEntries(formData);

    updateHospital.mutate(
      { hospital },
      {
        onSuccess: async (result) => {
          if (result?.data?.success) {
            await refetchHospitals();
            await refetchSingleHospital();
            navigate("/hospitals");
            alert("Hospital info updated!");
          }
        },
      }
    );
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">
        Update Hospital Details
      </h1>
      <form onSubmit={handleSubmit} className="w-96 mx-auto py-6 space-y-3">
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="hospitalName">Hospital Name:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="hospitalName"
            id="hospitalName"
            defaultValue={hospital?.hospitalName}
          />
        </div>
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="address">Address:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="address"
            id="address"
            defaultValue={hospital?.address}
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          type="submit"
        >
          Update Hospital
        </button>
      </form>
    </div>
  );
};

export default UpdateHospital;
