import Container from "../../components/Container";
import useGetAllSchedules from "../../hooks/useGetAllSchedules";
import Edit from "../../icons/Edit";
import Delete from "../../icons/Delete";
import axios from "axios";

const AllSchedules = () => {
  const { schedules, refetchSchedules } = useGetAllSchedules();

  const handleDelete = async (id) => {
    const result = await axios.delete(
      `https://hospital-server-seven.vercel.app/api/v1/schedules/${id}`
    );
    if (result?.data?.success) {
      refetchSchedules();
      alert("Schedule info deleted!");
    }
  };

  return (
    <div className="pt-4">
      <h1 className="text-3xl font-bold text-center">All Schedules List</h1>
      <Container>
        <table className="w-full border border-collapse my-5">
          <thead>
            <tr className="border ">
              <th className="px-4 py-1.5">ID</th>
              <th>Doctor Name</th>
              <th>Hospital Name</th>
              <th>Specialized At</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          {schedules?.map((schedule) => (
            <tbody key={schedule?.id}>
              <tr className="border text-center">
                <td className="px-4 py-1.5">{schedule?.id}</td>
                <td>{schedule?.doctor?.name}</td>
                <td>{schedule?.hospital?.hospitalName}</td>
                <td>{schedule?.specialization?.specialization}</td>
                <td>{schedule?.date}</td>
                <td>{schedule?.time}</td>
                <td className="flex justify-center gap-3 py-1.5">
                  <span>
                    <Edit />
                  </span>
                  <span onClick={() => handleDelete(schedule?.id)}>
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

export default AllSchedules;
