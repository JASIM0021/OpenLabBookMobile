export const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  };


 

  export const Endpoints = {

    appActive:{
      url:'https://erm-auth-service.onrender.com/api/v1/',
      method:HttpMethod.GET
    },
    

    register : {
      url:"user/create-user",
      method:HttpMethod.POST
  },
    login : {
        url:"user/login-user",
        method:HttpMethod.POST
    },
   

  };