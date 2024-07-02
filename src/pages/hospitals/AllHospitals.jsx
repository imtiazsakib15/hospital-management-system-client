import Container from "../../components/Container";
import useGetAllHospitals from "../../hooks/useGetAllHospitals";
import Edit from "../../icons/Edit";
import Delete from "../../icons/Delete";
import axios from "axios";

const AllHospitals = () => {
  const { hospitals, refetchHospitals } = useGetAllHospitals();

  const handleDelete = async (id) => {
    const result = await axios.delete(
      `https://hospital-server-seven.vercel.app/api/v1/hospitals/${id}`
    );
    if (result?.data?.success) {
      refetchHospitals();
      alert("Hospital info deleted!");
    }
  };

  return (
    <div className="pt-4">
      <h1 className="text-3xl font-bold text-center">All Hospitals List</h1>
      <Container>
        <table className="w-full border border-collapse my-5">
          <thead>
            <tr className="border ">
              <th className="px-4 py-1.5">ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          {hospitals?.map((hospital) => (
            <tbody key={hospital?.id}>
              <tr className="border text-center">
                <td className="px-4 py-1.5">{hospital?.id}</td>
                <td>{hospital?.hospitalName}</td>
                <td>{hospital?.address}</td>
                <td className="flex justify-center gap-3 py-1.5">
                  <Edit />
                  <span onClick={() => handleDelete(hospital?.id)}>
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

export default AllHospitals;
