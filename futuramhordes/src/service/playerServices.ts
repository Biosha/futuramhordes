import type { Character } from "@/models/character";
import { http } from "@/utils";
import axios from "axios";
import urlJoin from "url-join";
const API_SERVER = new URL(import.meta.env.VITE_API_URL);
const API_BASE = urlJoin(API_SERVER.toString(), "api/v1");

export const PlayerService = {
  login(discordId: string, discordTag: string): Promise<boolean> {
    return axios
      .post(
        `${API_BASE}/admin/authenticate`,
        {
          discord: discordId,
          discordTag: discordTag,
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
  getCasting(): Promise<Array<Character>> {
    return http()
      .get(`/player/getcasting`)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err));
  },
};
