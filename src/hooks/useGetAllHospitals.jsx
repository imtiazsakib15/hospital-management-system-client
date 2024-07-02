import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllHospitals = () => {
  const { data: hospitalQuery, refetch: refetchHospitals } = useQuery({
    queryKey: ["hospitals"],
    queryFn: async () =>
      await axios.get(
        "https://hospital-server-seven.vercel.app/api/v1/hospitals"
      ),
  });
  const hospitals = hospitalQuery?.data?.data;
  return { hospitals, refetchHospitals };
};

export default useGetAllHospitals;
