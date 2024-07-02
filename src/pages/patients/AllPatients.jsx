import Container from "../../components/Container";
import useGetAllPatients from "../../hooks/useGetAllPatients";
import Edit from "../../icons/Edit";
import Delete from "../../icons/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllPatients = () => {
  const { patients, refetchPatients } = useGetAllPatients();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const result = await axios.delete(
      `https://hospital-server-seven.vercel.app/api/v1/patients/${id}`
    );
    if (result?.data?.success) {
      refetchPatients();
      alert("Patient info deleted!");
    }
  };

  return (
    <div className="pt-4">
      <h1 className="text-3xl font-bold text-center">All Patients List</h1>
      <Container>
        <table className="w-full border border-collapse my-5">
          <thead>
            <tr className="border ">
              <th className="px-4 py-1.5">ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Actions</th>
            </tr>
          </thead>
          {patients?.map((patient) => (
            <tbody key={patient?.id}>
              <tr className="border text-center">
                <td className="px-4 py-1.5">{patient?.id}</td>
                <td>{patient?.name}</td>
                <td>{patient?.address}</td>
                <td>{patient?.email}</td>
                <td>{patient?.phoneNo}</td>
                <td className="flex justify-center gap-3 py-1.5">
                  <span onClick={() => navigate(`/patients/${patient?.id}`)}>
                    <Edit />
                  </span>
                  <span onClick={() => handleDelete(patient?.id)}>
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

export default AllPatients;
