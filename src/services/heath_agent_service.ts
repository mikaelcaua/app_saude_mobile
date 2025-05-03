import axios, { AxiosResponse } from "axios";
import HouseInterface from "../interfaces/house_interface";

export class HouseService {

  BASE_URL = 'http://192.168.100.97:8080/heath_agents'

  async getAllHousesFromOneHeathAgent(id:number, token:String): Promise<HouseInterface[]> {
    try {

      const response: AxiosResponse<HouseInterface[]> =
        await axios.get<HouseInterface[]>(
          `${this.BASE_URL}/${id}/houses`,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );

      if (response.status !== 200) {
        throw new Error('Status não-OK: ' + response.status);
      }

      const data: HouseInterface[] = response.data;
      return data;

    } catch (erro) {
      throw erro;
    }
  }


  logout() {
    return null;
  }
}
