import Container from "../../components/Container";
import useGetAllSpecializations from "../../hooks/useGetAllSpecializations";
import Edit from "../../icons/Edit";
import Delete from "../../icons/Delete";

const AllSpecializations = () => {
  const { specializations } = useGetAllSpecializations();

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

export default AllSpecializations;
