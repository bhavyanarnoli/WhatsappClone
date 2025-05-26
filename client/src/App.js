import Messenger from "./components/Messenger"; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from "./context/AccountProvider";  
function App() {
  const clientId = '178212199759-mlqsie6uh2kn8nft0qkgkr28du1djnct.apps.googleusercontent.com';
  return (

    <GoogleOAuthProvider clientId= {clientId}>
    <AccountProvider>
    <Messenger />    
    </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
