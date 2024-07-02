import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllPatients = () => {
  const { data: patientQuery, refetch: refetchPatients } = useQuery({
    queryKey: ["patients"],
    queryFn: async () =>
      await axios.get(
        "https://hospital-server-seven.vercel.app/api/v1/patients"
      ),
  });
  const patients = patientQuery?.data?.data;
  return { patients, refetchPatients };
};

export default useGetAllPatients;
