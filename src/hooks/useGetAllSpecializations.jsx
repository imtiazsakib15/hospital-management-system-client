import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllSpecializations = () => {
  const { data: specializationQuery, refetch: refetchSpecializations } =
    useQuery({
      queryKey: ["specializations"],
      queryFn: async () =>
        await axios.get(
          "https://hospital-server-seven.vercel.app/api/v1/specializations"
        ),
    });

  const specializations = specializationQuery?.data?.data;
  return { specializations, refetchSpecializations };
};

export default useGetAllSpecializations;
