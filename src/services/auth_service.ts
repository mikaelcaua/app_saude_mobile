import axios, { AxiosResponse } from "axios";
import UserInterface from "../interfaces/user_interface";

export class AuthService {
  BASE_URL = 'https://app-saude.devmikael.org/auth'

  async login(email: string, password: string): Promise<UserInterface> {
    try {

      const response: AxiosResponse<UserInterface> =
        await axios.post<UserInterface>(
          `${this.BASE_URL}/login`,
          { email, password }
        );

      if (response.status !== 200) {
        throw new Error('Status não-OK: ' + response.status);
      }

      const data: UserInterface = response.data;
      return data;

    } catch (erro) {
      throw erro;
    }
  }


  logout() {
    return null;
  }
}
