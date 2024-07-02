import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useGetAllPatients from "../../hooks/useGetAllPatients";

const UpdatePatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refetchPatients } = useGetAllPatients();

  const { data: patientQuery, refetch: refetchSinglePatient } = useQuery({
    queryKey: ["singlePatient"],
    queryFn: async () =>
      await axios.get(
        `https://hospital-server-seven.vercel.app/api/v1/patients/${id}`
      ),
  });
  const updatePatient = useMutation({
    mutationFn: (updatePatient) => {
      return axios.patch(
        `https://hospital-server-seven.vercel.app/api/v1/patients/${id}`,
        updatePatient
      );
    },
  });

  const patient = patientQuery?.data?.data;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const patient = Object.fromEntries(formData);

    updatePatient.mutate(
      { patient },
      {
        onSuccess: async (result) => {
          if (result?.data?.success) {
            refetchPatients();
            refetchSinglePatient();
            navigate("/patients");
            alert("Patient info updated!");
          }
        },
      }
    );
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">Update Patient Details</h1>
      <form onSubmit={handleSubmit} className="w-96 mx-auto py-6 space-y-3">
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="name">Name:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="name"
            id="name"
            defaultValue={patient?.name}
          />
        </div>
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="address">Address:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="address"
            id="address"
            defaultValue={patient?.address}
          />
        </div>
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="email">Email:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="email"
            id="email"
            defaultValue={patient?.email}
          />
        </div>
        <div className="grid grid-cols-3 items-center pb-3">
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="tel"
            name="phoneNo"
            id="phoneNo"
            defaultValue={patient?.phoneNo}
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          type="submit"
        >
          Update Patient
        </button>
      </form>
    </div>
  );
};

export default UpdatePatient;
