import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useGetAllDoctors from "../../hooks/useGetAllDoctors";
import useGetAllHospitals from "../../hooks/useGetAllHospitals";
import useGetAllSpecializations from "../../hooks/useGetAllSpecializations";
import useGetAllSchedules from "../../hooks/useGetAllSchedules";
import AllSchedules from "./AllSchedules";

const Schedules = () => {
  const { doctors } = useGetAllDoctors();
  const { hospitals } = useGetAllHospitals();
  const { specializations } = useGetAllSpecializations();
  const { refetchSchedules } = useGetAllSchedules();

  const addNewSchedule = useMutation({
    mutationFn: (newSchedule) => {
      return axios.post(
        "https://hospital-server-seven.vercel.app/api/v1/schedules/create-schedule",
        newSchedule
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const schedule = Object.fromEntries(formData);

    addNewSchedule.mutate(
      { schedule },
      {
        onSuccess: async (result) => {
          if (result?.data?.success) {
            await refetchSchedules();
            e.target.reset();
            alert("Schedule info saved!");
          }
        },
      }
    );
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">Create Doctor Schedule</h1>
      <form onSubmit={handleSubmit} className="w-96 mx-auto py-6 space-y-3">
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="doctor">Doctor:</label>
          <select
            className="border col-span-2 px-2 py-1"
            name="doctor"
            id="doctor"
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

        <div className="grid grid-cols-3 items-center">
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
          Create Schedule
        </button>
      </form>

      <AllSchedules />
    </div>
  );
};

export default Schedules;
