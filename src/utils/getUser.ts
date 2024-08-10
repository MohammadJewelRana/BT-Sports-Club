 

import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "useAuth must be used within an AuthProvider. Ensure that AuthProvider is wrapped around your component tree."
    );
  }

  return authContext.user ;
};

export default useAuth;