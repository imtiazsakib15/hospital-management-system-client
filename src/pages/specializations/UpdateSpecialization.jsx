import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useGetAllSpecializations from "../../hooks/useGetAllSpecializations";

const UpdateSpecialization = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refetchSpecializations } = useGetAllSpecializations();

  const { data: specializationQuery, refetch: refetchSingleSpecialization } =
    useQuery({
      queryKey: ["singleSpecialization"],
      queryFn: async () =>
        await axios.get(
          `https://hospital-server-seven.vercel.app/api/v1/specializations/${id}`
        ),
    });
  const UpdateSpecialization = useMutation({
    mutationFn: (UpdateSpecialization) => {
      return axios.patch(
        `https://hospital-server-seven.vercel.app/api/v1/specializations/${id}`,
        UpdateSpecialization
      );
    },
  });

  const specialization = specializationQuery?.data?.data;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const specialization = Object.fromEntries(formData);

    UpdateSpecialization.mutate(
      { specialization },
      {
        onSuccess: async (result) => {
          if (result?.data?.success) {
            await refetchSpecializations();
            await refetchSingleSpecialization();
            navigate("/specializations");
            alert("Specialization info updated!");
          }
        },
      }
    );
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">
        Update Specialization Details
      </h1>
      <form onSubmit={handleSubmit} className="w-96 mx-auto py-6 space-y-3">
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="Specialization">Specialization:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="specialization"
            id="specialization"
            defaultValue={specialization?.specialization}
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          type="submit"
        >
          Update Specialization
        </button>
      </form>
    </div>
  );
};

export default UpdateSpecialization;
