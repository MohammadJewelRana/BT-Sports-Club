import { useQuery } from "@tanstack/react-query";

const useCampaign= () => {
  const {
    data: campaignAll = [],
    isLoading: allCampaignLoading,
    refetch: campaignRefetch,
  } = useQuery({
    queryKey: ["notice"],
    // enabled: loading,

    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/campaign");
      // console.log(res);
      return res.json();
    },
  });
  

  return [campaignAll, allCampaignLoading, campaignRefetch];
};

export default useCampaign;
