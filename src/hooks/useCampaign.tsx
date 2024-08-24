import { useQuery } from "@tanstack/react-query";

const useCampaign = () => {
  const {
    data: campaignAll = [],
    isLoading: allCampaignLoading,
    refetch: campaignRefetch,
  } = useQuery({
    queryKey: ["campaign"],
    queryFn: async () => {
      const res = await fetch(
        "https://bt-sports-backend.vercel.app/api/campaign"
      );
      // console.log(res);
      return res.json();
    },
  });

  return [campaignAll, allCampaignLoading, campaignRefetch];
};

export default useCampaign;
