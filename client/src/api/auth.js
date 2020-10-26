import { request } from "./config/request";

class AuthApi {
  constructor(url) {
    this.url = url;
  }

  register = async (form) => {
    return await request(`${this.url}/register`, "POST", form);
  }

  login = async (form) => {
    return await request(`${this.url}/login`, "POST", form);
  }
}

export const auth = new AuthApi("/api/auth");