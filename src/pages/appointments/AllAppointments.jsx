import Container from "../../components/Container";
import useGetAllAppointments from "../../hooks/useGetAllAppointments";
import Edit from "../../icons/Edit";
import Delete from "../../icons/Delete";

const AllAppointments = () => {
  const { appointments } = useGetAllAppointments();

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
                  <span>
                    <Edit />
                  </span>
                  <span>
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
