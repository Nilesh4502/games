import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }) {
  return (
    
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
