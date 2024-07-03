import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useGetAllDoctors from "../../hooks/useGetAllDoctors";
import useGetAllHospitals from "../../hooks/useGetAllHospitals";
import useGetAllSpecializations from "../../hooks/useGetAllSpecializations";

const UpdateDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refetchDoctors } = useGetAllDoctors();
  const { hospitals } = useGetAllHospitals();
  const { specializations } = useGetAllSpecializations();

  const { data: doctorQuery, refetch: refetchSingleDoctor } = useQuery({
    queryKey: ["singleDoctor"],
    queryFn: async () =>
      await axios.get(
        `https://hospital-server-seven.vercel.app/api/v1/doctors/${id}`
      ),
  });
  const updateDoctor = useMutation({
    mutationFn: (updateDoctor) => {
      return axios.patch(
        `https://hospital-server-seven.vercel.app/api/v1/doctors/${id}`,
        updateDoctor
      );
    },
  });

  const doctor = doctorQuery?.data?.data;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const doctor = Object.fromEntries(formData);

    updateDoctor.mutate(
      { doctor },
      {
        onSuccess: async (result) => {
          if (result?.data?.success) {
            await refetchDoctors();
            await refetchSingleDoctor();
            navigate("/doctors");
            alert("Doctor info updated!");
          }
        },
      }
    );
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">Update Doctor Details</h1>
      <form onSubmit={handleSubmit} className="w-96 mx-auto py-6 space-y-3">
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="name">Name:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="name"
            id="name"
            defaultValue={doctor?.name}
          />
        </div>
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="email">Email:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="text"
            name="email"
            id="email"
            defaultValue={doctor?.email}
          />
        </div>
        <div className="grid grid-cols-3 items-center pb-3">
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="tel"
            name="phoneNo"
            id="phoneNo"
            defaultValue={doctor?.phoneNo}
          />
        </div>
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="hospital">Hospital:</label>
          <select
            className="border col-span-2 px-2 py-1"
            name="hospital"
            id="hospital"
            defaultValue={doctor?.hospital?._id || ""}
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
            defaultValue={doctor?.specialization?._id || ""}
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
          Update Doctor
        </button>
      </form>
    </div>
  );
};

export default UpdateDoctor;
