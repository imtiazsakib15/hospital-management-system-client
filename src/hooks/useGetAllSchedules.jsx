import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllSchedules = () => {
  const { data: scheduleQuery, refetch: refetchSchedules } = useQuery({
    queryKey: ["schedules"],
    queryFn: async () =>
      await axios.get(
        "https://hospital-server-seven.vercel.app/api/v1/schedules"
      ),
  });
  const schedules = scheduleQuery?.data?.data;
  return { schedules, refetchSchedules };
};

export default useGetAllSchedules;
