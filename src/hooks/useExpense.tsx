import { useQuery } from "@tanstack/react-query";

const useExpense = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["expense"],
    // enabled: loading,

    queryFn: async () => {
      const res = await fetch(
        "https://bt-sports-backend.vercel.app/api/campaign/expense"
      );
      // console.log(res);
      return res.json();
    },
  });

  return [data, isLoading, refetch];
};

export default useExpense;
