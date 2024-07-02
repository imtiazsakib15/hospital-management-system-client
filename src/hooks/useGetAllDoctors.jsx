import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllDoctors = () => {
  const { data: doctorQuery, refetch: refetchDoctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () =>
      await axios.get(
        "https://hospital-server-seven.vercel.app/api/v1/doctors"
      ),
  });
  const doctors = doctorQuery?.data?.data;
  return { doctors, refetchDoctors };
};

export default useGetAllDoctors;
