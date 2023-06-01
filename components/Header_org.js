import Link from 'next/link'
import {
  useSession,
  signIn,
  signOut
} from 'next-auth/react'

export default function Header() {
  const {
    data: session
  } = useSession();
  console.log(" header session data from usesession hook", session);



  const handleSignIn =(e) =>{
    e.preventDefault();

    console.log("sign in the user ");
    signIn();
  }
  const handleSignOut =(e) =>{
    e.preventDefault();
    console.log("sign OUT  the user ");
    signOut();
  }


  return ( 
    <div className = 'header' >
    < Link href = '/'
    className = 'logo' >
    NextAuth.js
    </Link>  

    {
      !session && < Link href = "#"
      className = "btn-signin" onClick={handleSignIn} >
        Sign in
        </Link>  
    }
    
    {
      session && < Link href = "#"
      className = "btn-signin" onClick={handleSignOut} >
        Sign out
        </Link>  
    } 
    </div>
  )
}