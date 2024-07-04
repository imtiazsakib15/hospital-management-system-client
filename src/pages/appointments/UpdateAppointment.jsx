import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useGetAllAppointments from "../../hooks/useGetAllAppointments";
import useGetAllHospitals from "../../hooks/useGetAllHospitals";
import useGetAllSpecializations from "../../hooks/useGetAllSpecializations";
import useGetAllDoctors from "../../hooks/useGetAllDoctors";
import { useEffect, useState } from "react";

const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refetchAppointments } = useGetAllAppointments();
  const { doctors } = useGetAllDoctors();
  const { hospitals } = useGetAllHospitals();
  const { specializations } = useGetAllSpecializations();
  const [time, setTime] = useState();
  const { data: appointment } = useLoaderData();
  const [appointmentDetails, setAppointmentDetails] = useState({
    hospital: appointment?.hospital?._id,
    specialization: appointment?.specialization?._id,
    doctor: appointment?.doctor?._id,
    date: appointment?.date,
  });

  const updateAppointment = useMutation({
    mutationFn: (updateAppointment) => {
      return axios.patch(
        `https://hospital-server-seven.vercel.app/api/v1/appointments/${id}`,
        updateAppointment
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
    const formData = new FormData(e.target);
    const appointment = Object.fromEntries(formData);

    updateAppointment.mutate(
      { appointment },
      {
        onSuccess: async (result) => {
          if (result?.data?.success) {
            await refetchAppointments();
            navigate("/appointments");
            alert("Appointment info updated!");
          }
        },
      }
    );
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center">
        Update Appointment Details
      </h1>
      <form onSubmit={handleSubmit} className="w-96 mx-auto py-6 space-y-3">
        <div className="grid grid-cols-3 items-center">
          <label htmlFor="patientId">Patient ID:</label>
          <input
            className="border col-span-2 px-2 py-1"
            type="number"
            name="patientId"
            id="patientId"
            defaultValue={appointment?.patientId}
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
            <option value={appointment?.hospital?._id}>
              {appointment?.hospital?.hospitalName}
            </option>
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
            <option value={appointment?.specialization?._id}>
              {appointment?.specialization?.specialization}
            </option>
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
            <option value={appointment?.doctor?._id}>
              {appointment?.doctor?.name}
            </option>
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
          Update Appointment
        </button>
      </form>
    </div>
  );
};

export default UpdateAppointment;
