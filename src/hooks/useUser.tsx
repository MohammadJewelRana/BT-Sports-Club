import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const {
    data:  userAll = [],
    isLoading: allUserLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["user"],
    // enabled: loading,

    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/user");
      // console.log(res);
      return res.json();
    },
  });

  return [userAll, allUserLoading, userRefetch];
};

export default useUser;
