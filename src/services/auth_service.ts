import axios from "axios";

export class AuthService {
    async login(email: string, password: string) {
      const response = await axios.post('http://localhost:8080/auth/login',{
        "email":"mikael123@gmail.com",
        "password":12345678
      })

      if(response.status!=200){
        console.log(response.data);
        throw Error('Houve um erro ao se conectar com a api:'+response);
      }

      console.log(response.data);
      return { id: "1", name: "João", email };
    }
  
    logout() {
      return null;
    }
  }
  