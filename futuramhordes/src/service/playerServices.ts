import type { Character } from "@/models/character";
import { http } from "@/utils";

export const PlayerService = {
  login(discordId: string, discordTag: string): Promise<string> {
    return http()
      .post(`/admin/authenticate`,{ discord: discordId, discordTag: discordTag })
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
