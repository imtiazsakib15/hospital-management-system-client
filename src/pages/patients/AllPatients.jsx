import Container from "../../components/Container";
import useGetAllPatients from "../../hooks/useGetAllPatients";
import Edit from "../../icons/Edit";
import Delete from "../../icons/Delete";

const AllPatients = () => {
  const { patients } = useGetAllPatients();

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
                  <Edit />
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

export default AllPatients;
