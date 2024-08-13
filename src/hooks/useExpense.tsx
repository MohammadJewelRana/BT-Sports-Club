import { useQuery } from "@tanstack/react-query";

const useExpense= () => {
  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["expense"],
    // enabled: loading,

    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/campaign/expense");
      // console.log(res);
      return res.json();
    },
  });
  

  return [data, isLoading, refetch];
};

export default useExpense;
