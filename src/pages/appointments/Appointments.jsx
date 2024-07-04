import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useGetAllDoctors from "../../hooks/useGetAllDoctors";
import useGetAllHospitals from "../../hooks/useGetAllHospitals";
import useGetAllSpecializations from "../../hooks/useGetAllSpecializations";
import { useEffect, useState } from "react";
import useGetAllAppointments from "../../hooks/useGetAllAppointments";
import AllAppointments from "./AllAppointments";

const Appointments = () => {
  const { doctors } = useGetAllDoctors();
  const { hospitals } = useGetAllHospitals();
  const { specializations } = useGetAllSpecializations();
  const { refetchAppointments } = useGetAllAppointments();
  const [time, setTime] = useState();
  const [appointmentDetails, setAppointmentDetails] = useState({
    hospital: "",
    specialization: "",
    doctor: "",
    date: new Date().toLocaleDateString(),
  });

  const addNewAppointment = useMutation({
    mutationFn: (newAppointment) => {
      return axios.post(
        "https://hospital-server-seven.vercel.app/api/v1/appointments/create-appointment",
        newAppointment
      );
    },
  });

  const handleChange = (e) => {
    e.preventDefault();
    setAppointmentDetails({
      ...appointmentDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetch(
      `https://hospital-server-seven.vercel.app/api/v1/schedules/appointment?hospital=${appointmentDetails?.hospital}&specialization=${appointmentDetails?.specialization}&doctor=${appointmentDetails?.doctor}&date=${appointmentDetails?.date}`
    )
      .then((res) => res.json())
      .then((data) => setTime(data?.data?.time));
  }, [appointmentDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!time) return;
    const formData = new FormData(e.target);
    const appointment = Object.fromEntries(formData);
    appointment.time = time;

    addNewAppointment.mutate(
      { appointment },
      {
        onSuccess: async (result) => {
          if (result?.data?.success) {
            await refetchAppointments();
            e.target.reset();
            setTime();
            alert("Appointment info saved!");
          }
        },
      }
    );
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">Doctor Appointment</h1>
      <form onSubmit={handleSubmit} className="w-96 mx-auto py-6 space-y-3">
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="patientId">Patient ID:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="number"
            name="patientId"
            id="patientId"
            min={1}
          />
        </div>

        <div className="grid grid-cols-3 items-center">
          <label htmlFor="hospital">Hospital:</label>
          <select
            onChange={handleChange}
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

        <div className="grid grid-cols-3 items-center">
          <label htmlFor="specialization">Specialized At:</label>
          <select
            onChange={handleChange}
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

        <div className="grid grid-cols-3 items-center pb-3">
          <label htmlFor="doctor">Doctor:</label>
          <select
            onChange={handleChange}
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

        <div>
          <h5 className="font-medium">Today at - {time || "N/A"}</h5>
        </div>

        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          type="submit"
        >
          Submit Appointment
        </button>
      </form>

      <AllAppointments />
    </div>
  );
};

export default Appointments;
