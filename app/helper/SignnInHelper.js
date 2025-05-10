import { GoogleSignin } from "@react-native-google-signin/google-signin";
import config from "../config";

const withGoogleSignin = async () => {
  
    GoogleSignin.configure({
      webClientId:config.webClientId
    });
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
     
      if (!isSignedIn) {
       
        await GoogleSignin.signIn();
       
      } else {
    
      }
    } catch (error) {   
      console.error("Error:", error);
     
    }
  };

  const SignInHelper=(isSignin,logic)=>{
        if(isSignin==true){
            logic()
        }else{
            withGoogleSignin()
        }
  }

  export default SignInHelper