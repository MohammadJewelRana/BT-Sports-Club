/* eslint-disable @typescript-eslint/no-explicit-any */
import useCampaign from "../hooks/useCampaign";
import useExpense from "../hooks/useExpense";
import useUser from "../hooks/useUser";
import LoadingPage from "../pages/Shared/LoadingPage";

export const totalCalculation = () => {
  const [data, isLoading] = useExpense();
 const [campaignAll, allCampaignLoading]=useCampaign();
   const [userAll, allUserLoading]=useUser();
    

 const expenseData = data?.data || [];
 const userAllData = userAll?.data || [];

 const depositedAmount = campaignAll?.data || [];
 console.log(depositedAmount);
 



  if (isLoading ||  allCampaignLoading || allUserLoading) {
    return <LoadingPage></LoadingPage>;
  }

  // Ensure that data exists and is an array
 

  // Calculate grand total expense
  const grandTotalExpense = expenseData.reduce((total:any, expense:any) => {
    return total + (expense.totalCost || 0);
  }, 0);


  const grandDepositAmount = depositedAmount.reduce((total:any, expense:any) => {
    return total + (expense.grandTotal || 0);
  }, 0);

  const remainingBalance=grandDepositAmount-grandTotalExpense;

  const userLength=userAllData?.length;

  return {grandTotalExpense,grandDepositAmount,remainingBalance,userLength}; // Return the calculated total
};
