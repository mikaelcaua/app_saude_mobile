export class AuthService {
    async login(email: string, password: string) {
      await new Promise((r) => setTimeout(r, 1000)); 
      return { id: "1", name: "João", email };
    }
  
    logout() {
      return null;
    }
  }
  