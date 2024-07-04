import Container from "../../components/Container";
import useGetAllAppointments from "../../hooks/useGetAllAppointments";
import Edit from "../../icons/Edit";
import Delete from "../../icons/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllAppointments = () => {
  const { appointments, refetchAppointments } = useGetAllAppointments();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const result = await axios.delete(
      `https://hospital-server-seven.vercel.app/api/v1/appointments/${id}`
    );
    if (result?.data?.success) {
      refetchAppointments();
      alert("Appointment info deleted!");
    }
  };

  return (
    <div className="pt-4">
      <h1 className="text-3xl font-bold text-center">All Appointments List</h1>
      <Container>
        <table className="w-full border border-collapse my-5">
          <thead>
            <tr className="border ">
              <th className="px-4 py-1.5">ID</th>
              <th className="px-4 py-1.5">Patient ID</th>
              <th>Hospital Name</th>
              <th>Specialized At</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          {appointments?.map((appointment) => (
            <tbody key={appointment?.id}>
              <tr className="border text-center">
                <td className="px-4 py-1.5">{appointment?.id}</td>
                <td className="px-4 py-1.5">{appointment?.patientId}</td>
                <td>{appointment?.hospital?.hospitalName}</td>
                <td>{appointment?.specialization?.specialization}</td>
                <td>{appointment?.doctor?.name}</td>
                <td>{appointment?.date}</td>
                <td>{appointment?.time}</td>
                <td className="flex justify-center gap-3 py-1.5">
                  <span
                    onClick={() => navigate(`/appointments/${appointment?.id}`)}
                  >
                    <Edit />
                  </span>
                  <span onClick={() => handleDelete(appointment?.id)}>
                    <Delete />
                  </span>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </Container>
    </div>
  );
};

export default AllAppointments;
