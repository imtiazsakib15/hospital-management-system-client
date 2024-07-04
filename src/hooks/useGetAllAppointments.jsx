import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllAppointments = () => {
  const { data: appointmentQuery, refetch: refetchAppointments } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () =>
      await axios.get(
        "https://hospital-server-seven.vercel.app/api/v1/appointments"
      ),
  });
  const appointments = appointmentQuery?.data?.data;
  return { appointments, refetchAppointments };
};

export default useGetAllAppointments;
