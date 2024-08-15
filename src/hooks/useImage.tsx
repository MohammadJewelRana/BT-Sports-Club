import { useQuery } from "@tanstack/react-query";

const useNotice = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["image"],
    // enabled: loading,

    queryFn: async () => {
      const res = await fetch(
        "https://bt-sports-backend.vercel.app/api/user/image/all"
      );
      // console.log(res);
      return res.json();
    },
  });

  return [data?.data, isLoading, refetch];
};

export default useNotice;
