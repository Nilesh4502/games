import { useEffect,useState } from "react";

import { useSession,getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Logout = () => {
  const [loading, setLoading] = useState(true); // Add a loading state variable

  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("in logout component session ",session);

  const handleSignOut = async () => {
    console.log("signing out the user");
    const data = await signOut({redirect: false, callbackUrl: "/"})
    router.push("/");

  //  router.push(data.url)  
  };

  useEffect(() => {
    console.log("in logout page useeffect session value", session);
  
    const checkSession = async () => {
      const session = await getSession(); // Get the session using getSession() function
      if (session) {
        handleSignOut();
      } else {
        console.log("Already logged out");
        router.push("/");
      }
      setLoading(false); // Set loading to false after checking session
    };
  
    checkSession();
  
  }, []);
  if (loading) {
    // Render loading state if still loading
    return <div>Loading...</div>;
  }
  
  

  return (
    <>
      {session ? <h1>logging out</h1> : <h1>Already logged out</h1>}
    </>
  );
};

export default Logout;
