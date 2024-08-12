import { useQuery } from "@tanstack/react-query";

const useNotice = () => {
  const {
    data: noticeAll = [],
    isLoading: allNoticeLoading,
    refetch: noticeRefetch,
  } = useQuery({
    queryKey: ["notice"],
    // enabled: loading,

    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/notice");
      // console.log(res);
      return res.json();
    },
  });
  

  return [noticeAll, allNoticeLoading, noticeRefetch];
};

export default useNotice;
