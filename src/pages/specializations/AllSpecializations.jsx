import Container from "../../components/Container";
import useGetAllSpecializations from "../../hooks/useGetAllSpecializations";
import Edit from "../../icons/Edit";
import Delete from "../../icons/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllSpecializations = () => {
  const { specializations, refetchSpecializations } =
    useGetAllSpecializations();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const result = await axios.delete(
      `https://hospital-server-seven.vercel.app/api/v1/specializations/${id}`
    );
    if (result?.data?.success) {
      refetchSpecializations();
      alert("Specialization info deleted!");
    }
  };

  return (
    <div className="pt-4">
      <h1 className="text-3xl font-bold text-center">
        All Specializations List
      </h1>
      <Container>
        <table className="w-full border border-collapse my-5">
          <thead>
            <tr className="border ">
              <th className="px-4 py-1.5">ID</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          {specializations?.map((specialization) => (
            <tbody key={specialization?.id}>
              <tr className="border text-center">
                <td className="px-4 py-1.5">{specialization?.id}</td>
                <td>{specialization?.specialization}</td>
                <td className="flex justify-center gap-3 py-1.5">
                  <span
                    onClick={() =>
                      navigate(`/specializations/${specialization?.id}`)
                    }
                  >
                    <Edit />
                  </span>
                  <span onClick={() => handleDelete(specialization?.id)}>
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

export default AllSpecializations;
