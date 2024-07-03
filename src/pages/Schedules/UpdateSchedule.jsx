import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useGetAllSchedules from "../../hooks/useGetAllSchedules";
import useGetAllHospitals from "../../hooks/useGetAllHospitals";
import useGetAllSpecializations from "../../hooks/useGetAllSpecializations";
import useGetAllDoctors from "../../hooks/useGetAllDoctors";

const UpdateSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refetchSchedules } = useGetAllSchedules();
  const { doctors } = useGetAllDoctors();
  const { hospitals } = useGetAllHospitals();
  const { specializations } = useGetAllSpecializations();

  const { data: scheduleQuery, refetch: refetchSingleSchedule } = useQuery({
    queryKey: ["singleSchedule"],
    queryFn: async () =>
      await axios.get(
        `https://hospital-server-seven.vercel.app/api/v1/schedules/${id}`
      ),
  });
  const updateSchedule = useMutation({
    mutationFn: (updateSchedule) => {
      return axios.patch(
        `https://hospital-server-seven.vercel.app/api/v1/schedules/${id}`,
        updateSchedule
      );
    },
  });

  const schedule = scheduleQuery?.data?.data;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const schedule = Object.fromEntries(formData);

    updateSchedule.mutate(
      { schedule },
      {
        onSuccess: async (result) => {
          if (result?.data?.success) {
            await refetchSchedules();
            await refetchSingleSchedule();
            navigate("/schedules");
            alert("Schedule info updated!");
          }
        },
      }
    );
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">
        Update Schedule Details
      </h1>
      <form onSubmit={handleSubmit} className="w-96 mx-auto py-6 space-y-3">
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="doctor">Doctor:</label>
          <select
            className="border col-span-2 px-2 py-1"
            name="doctor"
            id="doctor"
            defaultValue={schedule?.doctor?._id || ""}
            required
          >
            <option></option>
            {doctors?.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 items-center">
          <label htmlFor="hospital">Hospital:</label>
          <select
            className="border col-span-2 px-2 py-1"
            name="hospital"
            id="hospital"
            defaultValue={schedule?.hospital?._id || ""}
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

        <div className="grid grid-cols-3 items-center">
          <label htmlFor="specialization">Specialized At:</label>
          <select
            className="border col-span-2 px-2 py-1"
            name="specialization"
            id="specialization"
            defaultValue={schedule?.specialization?._id || ""}
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

        <div className="grid grid-cols-3 items-center pb-3">
          <label htmlFor="time">Time:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="time"
            name="time"
            id="time"
            required
          />
        </div>

        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          type="submit"
        >
          Update Schedule
        </button>
      </form>
    </div>
  );
};

export default UpdateSchedule;
