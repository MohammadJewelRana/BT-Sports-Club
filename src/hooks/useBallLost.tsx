import { useQuery } from "@tanstack/react-query";

const useBallLost = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["ballLost"],

    queryFn: async () => {
      const res = await fetch(
        "https://bt-sports-backend.vercel.app/api/notice/ball-lost"
      );
      // console.log(res);
      return res.json();
    },
  });

  return [data, isLoading, refetch];
};

export default useBallLost;
