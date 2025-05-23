import Messenger from "./components/Messenger"; 
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const clientId = '178212199759-mlqsie6uh2kn8nft0qkgkr28du1djnct.apps.googleusercontent.com';
  return (

    <GoogleOAuthProvider clientId= {clientId}>
    <Messenger />    
    </GoogleOAuthProvider>
  );
}

export default App;
