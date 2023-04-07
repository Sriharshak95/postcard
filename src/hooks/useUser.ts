import { useEffect, useState } from "react";

function useUser() {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setUserDetails(JSON.parse(userDetails));
    }
  }, []);

  return { userDetails, setUserDetails };
}

export default useUser;
