import { request } from "./config/request";

class LinksApi {
  constructor(url) {
    this.url = url;
  }

  getLinks = async (token) => {
    return await request(this.url, "GET", null, { Authorization: `Bearer ${token}` });
  }

  deleteLink = async (id, token) => {
    return await request(this.url, "DELETE", { id }, { Authorization: `Bearer ${token}` });
  }

  generateLink = async (link, token) => {
    return await request(`${this.url}/generate`, "POST", { from: link }, { Authorization: `Bearer ${token}` });
  }

  goForLink = async (linkId, token) => {
    return await request(`${this.url}/${linkId}`, "GET", null, { Authorization: `Bearer ${token}` });
  }
}

export const links = new LinksApi("/api/link");