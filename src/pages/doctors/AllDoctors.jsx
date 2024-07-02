import Container from "../../components/Container";
import useGetAllDoctors from "../../hooks/useGetAllDoctors";
import Edit from "../../icons/Edit";
import Delete from "../../icons/Delete";
import axios from "axios";

const AllDoctors = () => {
  const { doctors, refetchDoctors } = useGetAllDoctors();

  const handleDelete = async (id) => {
    const result = await axios.delete(
      `https://hospital-server-seven.vercel.app/api/v1/doctors/${id}`
    );
    if (result?.data?.success) {
      refetchDoctors();
      alert("Doctor info deleted!");
    }
  };

  return (
    <div className="pt-4">
      <h1 className="text-3xl font-bold text-center">All Doctors List</h1>
      <Container>
        <table className="w-full border border-collapse my-5">
          <thead>
            <tr className="border ">
              <th className="px-4 py-1.5">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Hospital Name</th>
              <th>Specialized At</th>
              <th>Actions</th>
            </tr>
          </thead>
          {doctors?.map((doctor) => (
            <tbody key={doctor?.id}>
              <tr className="border text-center">
                <td className="px-4 py-1.5">{doctor?.id}</td>
                <td>{doctor?.name}</td>
                <td>{doctor?.email}</td>
                <td>{doctor?.phoneNo}</td>
                <td>{doctor?.hospital?.hospitalName}</td>
                <td>{doctor?.specialization?.specialization}</td>
                <td className="flex justify-center gap-3 py-1.5">
                  <Edit />
                  <span onClick={() => handleDelete(doctor?.id)}>
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

export default AllDoctors;
