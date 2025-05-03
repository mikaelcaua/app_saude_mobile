import UserInterface from "./user_interface";

interface AuthContextInterface {
  user: UserInterface | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export default AuthContextInterface;