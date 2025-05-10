
 const  FirebaseError = ({error}:{error:string}) => {

        switch(error){
            case "auth/network-request-failed":
                return "Request Faild Connection Error"
            default:
                return error
        }
}

export default FirebaseError