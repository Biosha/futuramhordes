import { http } from "@/utils";
import axios from "axios";
import urlJoin from "url-join";
const API_SERVER = new URL(urlJoin(`${encodeURI(window.location.protocol)}//${encodeURI(window.location.hostname)}:${import.meta.env.VITE_API_PORT}`));
const API_BASE = urlJoin(API_SERVER.toString(), "api/v1");
console.log(API_BASE)
export const AdminService = {
  getPannel(): Promise<Array<any>> {
    return http()
      .get(`${API_BASE}/admin/getpannel`)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
  updatePlayer(
    discordId: string,
    MHName: string,
    character: string
  ): Promise<Array<any>> {
    return axios
      .post(
        `${API_BASE}/admin/update`,
        {
          discord: discordId,
          MHName: MHName,
          character: character,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
};
